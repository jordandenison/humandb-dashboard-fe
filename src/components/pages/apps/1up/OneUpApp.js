import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import superagent from 'superagent'

import { url } from 'lib/feathers/feathersClient'
import OneUpAppView from './OneUpAppView'

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  processing: state.http.processing,
  error: state.http.error
})

const mapDispatchToProps = dispatch => {
  return {
    routeTo: path => dispatch(push(path)),
    syncData: async () => {
      try {
        dispatch({ type: 'HTTP_REQUEST_START' })
        await superagent
          .post(`${url}/sync-1up-data`)
          .set('Authorization', `Bearer ${window.localStorage && window.localStorage.getItem && window.localStorage.getItem('feathers-jwt')}`)
        dispatch({ type: 'HTTP_REQUEST_SUCCESS' })
      } catch (e) {
        dispatch({ type: 'HTTP_REQUEST_ERROR', error: e.message })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneUpAppView)
