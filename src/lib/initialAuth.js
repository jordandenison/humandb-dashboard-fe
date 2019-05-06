import superagent from 'superagent'

import feathersAuthentication from 'lib/feathers/feathersAuthentication'
import { url } from 'lib/feathers/feathersClient'

const urlParams = new URLSearchParams(window.location.search)
const queryStringAccessToken = urlParams.get('accessToken')
const queryStringSSOAccessToken = urlParams.get('SSOtoken')
const discourseSSOTempTokenInit = urlParams.get('discourseSSOTempToken')

if (discourseSSOTempTokenInit) {
  window.localStorage && window.localStorage.getItem && window.localStorage.setItem('discourseSSOTempToken', discourseSSOTempTokenInit)
}

const accessToken = queryStringAccessToken || (window.localStorage && window.localStorage.getItem && window.localStorage.getItem('feathers-jwt'))

const redirectToSSOlogin = () => window.location.replace(`https://login.humandb.ai/?redirectUrl=https://${window.location.hostname}/`)

const redirectToSSOloginAndLogout = () => window.location.replace(`https://login.humandb.ai/?redirectUrl=https://${window.location.hostname}/&logout=true`)

const processLogin = async (store, accessToken) => {
  const authenticationOptions = {
    strategy: 'jwt',
    accessToken
  }

  try {
    const results = await store.dispatch(feathersAuthentication.authenticate(authenticationOptions))

    const discourseSSOTempToken = window.localStorage && window.localStorage.getItem && window.localStorage.getItem('discourseSSOTempToken')

    const action = {
      type: 'LOGIN_SUCCESS',
      user: results.value.user,
      accessToken: results.value.accessToken
    }

    if (discourseSSOTempToken) {
      action.discourseSSOTempToken = discourseSSOTempToken
      window.localStorage && window.localStorage.removeItem && window.localStorage.removeItem('discourseSSOTempToken')
    }

    store.dispatch(action)
  } catch (e) {
    console.log(`Token login error: ${e.message}`)
    return redirectToSSOloginAndLogout()
  }
}

const init = async store => {
  if (window.location.pathname === '/dev-login') {
    const { body: { accessToken } } = await superagent.get(`${url}/dev-login`)

    return processLogin(store, accessToken)
  } else if (accessToken) {
    return processLogin(store, accessToken)
  } else if (queryStringSSOAccessToken) {
    const { body: { localAccessToken } } = await superagent.post(`${url}/sso-login`).send({ accessToken: queryStringSSOAccessToken })

    return processLogin(store, localAccessToken)
  } else {
    return redirectToSSOlogin()
  }
}

export default init
