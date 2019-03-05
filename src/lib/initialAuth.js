import feathersAuthentication from 'lib/feathers/feathersAuthentication'
import { push } from 'react-router-redux'
import superagent from 'superagent'

import { url } from 'lib/feathers/feathersClient'

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const queryStringAccessToken = getParameterByName('accessToken')
const discourseSSOTempTokenInit = getParameterByName('discourseSSOTempToken')

if (discourseSSOTempTokenInit) {
  window.localStorage && window.localStorage.getItem && window.localStorage.setItem('discourseSSOTempToken', discourseSSOTempTokenInit)
}

const accessToken = queryStringAccessToken || (window.localStorage && window.localStorage.getItem && window.localStorage.getItem('feathers-jwt'))

const processLogin = async (store, options) => {
  try {
    const results = await store.dispatch(feathersAuthentication.authenticate(options))

    const discourseSSOTempToken = window.localStorage && window.localStorage.getItem && window.localStorage.getItem('discourseSSOTempToken')

    const action = {
      type: 'LOGIN_SUCCESS',
      user: results.value.user,
      accessToken: results.value.accessToken
    }

    if (discourseSSOTempToken) { action.discourseSSOTempToken = discourseSSOTempToken }

    store.dispatch(action)
  } catch (e) {
    console.log(`Token login error: ${e.message}`)
    store.dispatch(push('/login'))
  }
}

const init = async store => {
  if (accessToken) {
    const authenticationOptions = {
      strategy: 'jwt',
      accessToken
    }

    return processLogin(store, authenticationOptions)
  } else if (window.location.pathname === '/dev-login') {
    const { body: { accessToken } } = await superagent.get(`${url}/dev-login`)

    const localDevAuthenticationOptions = {
      strategy: 'jwt',
      accessToken
    }

    return processLogin(store, localDevAuthenticationOptions)
  } else {
    return Promise.resolve()
  }
}

export default init
