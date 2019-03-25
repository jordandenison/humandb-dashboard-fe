import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const inProgressRegexp = /in progress/i

class OneUpAppView extends Component {
  componentDidMount () {
    this.props.get1upSyncStatus()
  }

  render () {
    const { currentUser, syncData, status, error, loaded } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <div style={{ textAlign: 'center' }}>Loading 1up App...<Icon name='spinner' loading /></div>
          : <div className='1upAppContainer' style={{ textAlign: 'center' }}>
            <p style={{ color: 'black' }}>Select your health provider(s) from the list below.</p>
            <p style={{ color: 'black' }}>Once all providers have been collected, click the "sync data" button below to import your data into your HumanDB.</p>
            <br />
            <iframe
              title='1up'
              style={{ border: '0px solid #fff' }}
              src={`https://api.1up.health/connect/marketplace?client_id=${currentUser.oneUpClientId}&access_token=${currentUser.oneUpAccessToken}`}
              height='500'
              width='100%' />
            <br />
            <br />
            { error && <p style={{ color: 'red' }}>Error: {error}</p> }
            { inProgressRegexp.test(status.status) && <p style={{ color: 'black' }}>Check the <Link to='/status/'>status page</Link> for sync progress. Syncing may take several minutes to complete.</p> }
            <Button disabled={inProgressRegexp.test(status.status)} onClick={syncData}>{ inProgressRegexp.test(status.status) ? 'Syncing Data...' : 'Sync Data'}</Button>
          </div>
        }
      </div>
    )
  }
}

export default OneUpAppView
