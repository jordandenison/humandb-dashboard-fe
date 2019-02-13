import React, { Component } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class DataReportingIntegrationView extends Component {
  render () {
    const { loaded = true, generateReport } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : <div className='statusContainer'>
            <Segment>
              <Header as='h2'>Data Reporting Actions</Header>
              <br />
              <Button onClick={generateReport}>Generate Report</Button>
              <br />
              <br />
              <Link to='/integrations' className='ui button secondary'>Back to Integrations</Link>
            </Segment>
          </div>
        }
      </div>
    )
  }
}

export default DataReportingIntegrationView
