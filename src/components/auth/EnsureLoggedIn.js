import React, { Component } from 'react'
import { connect } from 'react-redux'

class EnsureLoggedIn extends Component {
  render () {
    const { isLoggedIn, children } = this.props

    if (window.location.pathname === '/dev-login' || !isLoggedIn) {
      return <div />
    }

    return <div>{children}</div>
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.currentUser.id
  }
}

export default connect(mapStateToProps)(EnsureLoggedIn)
