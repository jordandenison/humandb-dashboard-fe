import React, { Component } from 'react'
import { Button, Icon, Image, Input, Pagination, Segment, Table } from 'semantic-ui-react'

const iconsPath = '/images/icons'
const sortUpSrc = `${iconsPath}/up.svg`
const sortDownSrc = `${iconsPath}/down.svg`

class UsersView extends Component {
  componentDidMount () {
    this.props.loadUsers()
  }

  render () {
    const { loaded, users, setPage, setSort, setSearch, page, search, routeTo, removeUser, queryResult } = this.props

    const userHeaders = [
      { name: 'Email Addresses', sortOption: 'emails' },
      { name: 'Role', sortOption: 'role' },
      { name: 'Actions' }
    ]

    return (
      <div className='usersComponent'>
        <div>
          <Input loading={!loaded} icon='dollar' placeholder='Search...' onChange={(e, { value }) => { setSearch(value) }} value={search} />
          <Button floated='right' color='teal' onClick={() => routeTo('/users/create')}>Add User</Button>
        </div>
        <br />
        {!loaded
          ? <span>Loading users...<Icon name='spinner' loading /></span>
          : users.length
          ? <div className='tableContainer'>
            <div className='tableScrollContainer'>
              <Table className='abTable' unstackable>
                <Table.Header className='tableHeader'>
                  <Table.Row>
                    { userHeaders.map((userHeader, i) =>
                      userHeader.name === 'Actions'
                      ? <Table.HeaderCell key={`${userHeader.name}${i}`}>{userHeader.name}</Table.HeaderCell>
                      : <Table.HeaderCell key={`${userHeader.name}${i}`}>{userHeader.name}
                        <span className='sortButtons'>
                          <Image
                            src={sortUpSrc}
                            onClick={() => { setSort({ [userHeader.sortOption]: 1 }) }} />
                          <Image
                            src={sortDownSrc}
                            onClick={() => { setSort({ [userHeader.sortOption]: -1 }) }} />
                        </span>
                      </Table.HeaderCell>
                    ) }
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {users
                      .map(user => <Table.Row key={user.id}>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell style={{ textTransform: 'capitalize' }}>{user.role.replace(/internal/, 'bot')}</Table.Cell>
                        <Table.Cell>{users.length > 1 && <Button onClick={() => removeUser(user.id)}>Remove</Button>}</Table.Cell>
                      </Table.Row>)}
                </Table.Body>

                { queryResult.users.total > 10 && <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell floated='right' colSpan={userHeaders.length}>
                      <Pagination
                        floated='right'
                        activePage={page + 1}
                        totalPages={
                          queryResult.users
                            ? Math.floor(
                                queryResult.users.total /
                                  queryResult.users.limit
                              ) + 1
                            : 1
                        }
                        onPageChange={(e, { activePage }) => setPage(activePage - 1)}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer> }
              </Table>
            </div>
          </div>
          : <Segment>{ search ? 'No users match your search criteria' : 'No users have been made yet' }</Segment>
        }
      </div>
    )
  }
}

export default UsersView
