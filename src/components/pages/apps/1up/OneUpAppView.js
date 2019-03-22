import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class OneUpAppView extends Component {
  render () {
    const { currentUser, processing, syncData, loaded = true } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
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
            { processing && <p style={{ color: 'black' }}>Check the <Link to='/status/'>status page</Link> for sync progress. Syncing may take several minutes to complete.</p> }
            <Button disabled={processing} onClick={syncData}>{ processing ? 'Syncing Data...' : 'Sync Data'}</Button>
          </div>
        }
      </div>
    )
  }
}

export default OneUpAppView
