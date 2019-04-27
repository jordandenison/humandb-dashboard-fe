import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import superagent from 'superagent'

import { url } from 'lib/feathers/feathersClient'
import services from 'lib/feathers/feathersServices'
import OneUpAppView from './OneUpAppView'

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  status: state.status.queryResult ? state.status.queryResult.data && state.status.queryResult.data[0] : {},
  loaded: state.status.isFinished,
  error: state.http.error
})

const mapDispatchToProps = dispatch => {
  return {
    routeTo: path => dispatch(push(path)),
    get1upSyncStatus: async () => dispatch(services['auth/status'].find({ query: { service: '1up', dependency: 'FHIR Data Retrieval' } })),
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
