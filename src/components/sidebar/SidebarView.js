import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import './Sidebar.css'

const AppsRegexp = /^\/apps/
const statusRegexp = /^\/status/
const usersRegexp = /^\/users/

class SidebarView extends Component {
  render () {
    const { currentUser, routeTo, router } = this.props

    return currentUser.id ? (
      <Menu vertical className='sidebarComponent'>
        <Menu.Item onClick={() => routeTo('/')}>
          <Image src='/images/18F-HumanDB-LogoR1-02.svg' />
        </Menu.Item>
        <Menu.Item active={usersRegexp.test(router.location.pathname)} onClick={() => routeTo('/users')}>
          Users
        </Menu.Item>
        <Menu.Item active={AppsRegexp.test(router.location.pathname)} onClick={() => routeTo('/apps')}>
          Apps
        </Menu.Item>
        <Menu.Item active={statusRegexp.test(router.location.pathname)} onClick={() => routeTo('/status')}>
          Status
        </Menu.Item>
        <Menu.Item onClick={() => window.location.replace(`https://${window.location.hostname}/discussion/`)}>
          Discussion
        </Menu.Item>
        <Menu.Item disabled>
          Curematch Report Panel
        </Menu.Item>
        <Menu.Item disabled>
          Appstore
        </Menu.Item>
      </Menu>
    ) : ''
  }
}

export default SidebarView
