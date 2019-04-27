import { connect } from 'react-redux'

import services from 'lib/feathers/feathersServices'
import StatusView from './StatusView'

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  statuses: state.status.queryResult ? state.status.queryResult.data : [],
  loaded: state.status.isFinished
})

const mapDispatchToProps = dispatch => {
  return {
    loadStatuses: () => dispatch(services['auth/status'].find())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusView)
