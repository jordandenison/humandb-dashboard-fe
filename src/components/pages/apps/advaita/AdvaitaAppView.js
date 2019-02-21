import React, { Component } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class AdvaitaAppView extends Component {
  render () {
    const { loaded = true } = this.props

    return (
      <div className='usersComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : <div className='statusContainer'>
            <Segment>
              <Header as='h2'>Advaitabio Actions</Header>
              <br />
              <span>Coming soon...</span>
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

export default AdvaitaAppView
