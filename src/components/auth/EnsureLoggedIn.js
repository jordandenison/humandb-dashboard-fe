import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class EnsureLoggedIn extends Component {
  render () {
    const { isLoggedIn, children } = this.props

    if (window.location.pathname === '/dev-login') {
      return <div />
    }

    if (isLoggedIn) {
      return <div>{children}</div>
    }

    return <Redirect to='/login' />
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.currentUser.id
  }
}

export default connect(mapStateToProps)(EnsureLoggedIn)
