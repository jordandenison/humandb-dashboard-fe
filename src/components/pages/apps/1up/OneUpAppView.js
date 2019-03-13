import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class OneUpAppView extends Component {
  render () {
    const { currentUser, processing, syncData, loaded = true } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : <div className='1upAppContainer' style={{ textAlign: 'center' }}>
            <Button disabled={processing} onClick={syncData}>{ processing ? 'Syncing Data...' : 'Sync Data'}</Button>
            <br />
            <iframe
              title='1up'
              style={{ border: '0px solid #fff' }}
              src={`https://api.1up.health/connect/marketplace?client_id=${currentUser.oneUpClientId}&access_token=${currentUser.oneUpAccessToken}`}
              height='500'
              width='100%' />
          </div>
        }
      </div>
    )
  }
}

export default OneUpAppView
