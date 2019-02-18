import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import superagent from 'superagent'

import { url } from 'lib/feathers/feathersClient'
import DataReportingIntegrationView from './DataReportingIntegrationView'

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  processing: state.http.processing,
  error: state.http.error
})

const mapDispatchToProps = dispatch => {
  return {
    routeTo: path => dispatch(push(path)),
    generateReport: async () => {
      try {
        dispatch({ type: 'HTTP_REQUEST_START' })
        await superagent
          .post(`${url}/generate-data-report`)
          .set('Authorization', `Bearer ${window.localStorage && window.localStorage.getItem && window.localStorage.getItem('feathers-jwt')}`)
        window.location.href = '/discussion'
      } catch (e) {
        dispatch({ type: 'HTTP_REQUEST_ERROR', error: e.message })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataReportingIntegrationView)
