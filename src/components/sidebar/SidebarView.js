import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import './Sidebar.css'

const AppsRegexp = /^\/apps/
const dataFilesRegexp = /^\/data-files/
const statusRegexp = /^\/status/
const usersRegexp = /^\/users/

class SidebarView extends Component {
  render () {
    const { currentUser, routeTo, router } = this.props

    return currentUser.id ? (
      <Menu vertical className='sidebarComponent'>
        <Menu.Item onClick={() => routeTo('/')}>
          <Image size='tiny' src='/images/logo.png' centered />
        </Menu.Item>
        <Menu.Item active={usersRegexp.test(router.location.pathname)} onClick={() => routeTo('/users')}>
          Users
        </Menu.Item>
        <Menu.Item active={AppsRegexp.test(router.location.pathname)} onClick={() => routeTo('/apps')}>
          Apps
        </Menu.Item>
        <Menu.Item active={dataFilesRegexp.test(router.location.pathname)} onClick={() => routeTo('/data-files')}>
          Data Files
        </Menu.Item>
        <Menu.Item active={statusRegexp.test(router.location.pathname)} onClick={() => routeTo('/status')}>
          Status
        </Menu.Item>
        <Menu.Item target='_blank' rel='noopener noreferrer' href={`https://${window.location.hostname}/discussion/`} onClick={() => {}}>
          Discussion
        </Menu.Item>
        <Menu.Item disabled>
          Appstore
        </Menu.Item>
      </Menu>
    ) : ''
  }
}

export default SidebarView
