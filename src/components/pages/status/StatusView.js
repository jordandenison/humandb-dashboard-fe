import React, { Component } from 'react'
import { Card, Icon, Segment } from 'semantic-ui-react'
import moment from 'moment'

class StatusView extends Component {
  componentDidMount () {
    this.props.loadStatuses()
  }

  render () {
    const { loaded, statuses } = this.props

    return (
      <div className='statusComponent'>
        {!loaded
          ? <span>Loading status...<Icon name='spinner' loading /></span>
          : statuses.length
          ? <div className='statusContainer'>
            <Card.Group>
              { statuses.map(status => {
                return (
                  <Card key={`${status.id}${status.service}${status.dependency}`}>
                    <Card.Content>
                      <Card.Header>{status.service}</Card.Header>
                      <Card.Meta>{status.dependency}</Card.Meta>
                      <Card.Description>
                        {moment(status.updatedAt).format('MM/DD/YYYY, h:mm:ss a')}
                        <br />
                        {status.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <span style={{ color: /(available|complete)/i.test(status.status) ? 'green' : /(in progress)/i.test(status.status) ? 'orange' : 'red' }}>{status.status}</span>

                      { status.error &&
                        <div style={{ marginTop: '10px', color: 'red' }}>Error: {status.error}</div>
                      }
                    </Card.Content>
                  </Card>
                )
              })
              }
            </Card.Group>
          </div>
          : <Segment>There are no status updates yet.</Segment>
        }
      </div>
    )
  }
}

export default StatusView
