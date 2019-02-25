import React, { Component } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class FhirDataToolAppView extends Component {
  render () {
    const { loaded = true } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : <div className='statusContainer'>
            <Segment>
              <Header as='h2'>FHIR Data Tool</Header>
              <br />
              <Button>Export</Button>
              <Button>Import</Button>
              <br />
              <br />
              <Link to='/apps' className='ui button secondary'>Back to Apps</Link>
            </Segment>
          </div>
        }
      </div>
    )
  }
}

export default FhirDataToolAppView
