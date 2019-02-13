import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import superagent from 'superagent'

import { url } from 'lib/feathers/feathersClient'
import DataReportingIntegrationView from './DataReportingIntegrationView'

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => {
  return {
    routeTo: path => dispatch(push(path)),
    generateReport: async () =>
      superagent
        .post(`${url}/generate-data-report`)
        .set('Authorization', `Bearer ${window.localStorage && window.localStorage.getItem && window.localStorage.getItem('feathers-jwt')}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataReportingIntegrationView)
