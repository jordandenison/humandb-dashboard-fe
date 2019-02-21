import React, { Component } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class DataReportingAppView extends Component {
  render () {
    const { loaded = true, processing, generateReport, error } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : <div className='statusContainer'>
            <Segment>
              <Header as='h2'>Data Reporting Actions</Header>
              <br />
              <Button disabled={processing} onClick={generateReport}>{ processing ? 'Generating Report...' : 'Generate Report'}</Button>
              <br />
              { error && <div><span style={{ color: 'red' }}>Error: {error}</span></div> }
              <br />
              <Link to='/apps' className='ui button secondary'>Back to Apps</Link>
            </Segment>
          </div>
        }
      </div>
    )
  }
}

export default DataReportingAppView
