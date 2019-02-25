import React, { Component } from 'react'
import { Card, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class AppsView extends Component {
  render () {
    const { loaded = true } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : <div className='statusContainer'>
            <Segment>
              <Card.Group>
                <Card
                  image='/images/ADVAITA-Logo-NewTag220.png'
                  header={<a target='_blank' rel='noopener noreferrer' href='https://advaitabio.com/'>Advaitabio</a>}
                  meta='Bioinformatics that Inspire'
                  description='Other solutions bring you the haystack; we lead you to the needle in the haystack.'
                  extra={<Link to='/apps/advaita' className='ui button primary'>Actions</Link>}
                />
                <Card
                  image='/images/1upHealthLogo.png'
                  header={<a target='_blank' rel='noopener noreferrer' href='https://1up.health/'>1upHealth</a>}
                  meta='FHIR data aggregation'
                  description='1upHealth provides 100s of medical application companies and health systems with the tools they need to create easy and accessible experiences for their users.'
                  extra={<Link to='/apps/1up' className='ui button primary'>Actions</Link>}
                />
                <Card
                  header='Data Availability Report'
                  description='Generates a report of available data and creates a discussion post.'
                  extra={<Link to='/apps/data-reporting' className='ui button primary'>Actions</Link>}
                />
                <Card
                  header='FHIR Data Browser'
                  description='Explore your current FHIR data'
                  extra={<a className='ui button primary' target='_blank' rel='noopener noreferrer' href='/auth/fhir-stu2-ui/stu2'>Explore</a>}
                />
                <Card
                  header='FHIR Data JSON Export/Import Tool'
                  description='Exports FHIR data as JSON or imports JSON FHIR data that has been exported from this tool'
                  extra={<Link to='/apps/fhir-data-tool' className='ui button primary'>Actions</Link>}
                />
              </Card.Group>
            </Segment>
          </div>
        }
      </div>
    )
  }
}

export default AppsView
