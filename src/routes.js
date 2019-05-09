import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import EnsureLoggedIn from 'components/auth/EnsureLoggedIn'
import Home from 'components/pages/home/Home'
import Login from 'components/pages/login/Login'
import Users from 'components/pages/users/Users'
import CreateUser from 'components/pages/users/create/CreateUser'
import Status from 'components/pages/status/Status'
import Apps from 'components/pages/apps/Apps'
import AdvaitaApp from 'components/pages/apps/advaita/AdvaitaApp'
import DataReportingApp from 'components/pages/apps/data-reporting/DataReportingApp'
import FhirDataToolApp from 'components/pages/apps/fhir-data-tool/FhirDataToolApp'
import OneUpApp from 'components/pages/apps/1up/OneUpApp'
import FilesApp from 'components/pages/files/FilesApp'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/login' component={Login} />
        <EnsureLoggedIn>
          <Route exact path='/' component={Home} />

          <Route exact path='/users' component={Users} />
          <Route exact path='/users/create' component={CreateUser} />
          <Route exact path='/status' component={Status} />
          <Route exact path='/data-files' component={FilesApp} />
          <Route exact path='/apps' component={Apps} />
          <Route exact path='/apps/advaita' component={AdvaitaApp} />
          <Route exact path='/apps/data-reporting' component={DataReportingApp} />
          <Route exact path='/apps/fhir-data-tool' component={FhirDataToolApp} />
          <Route exact path='/apps/1up' component={OneUpApp} />
        </EnsureLoggedIn>
      </Switch>
    )
  }
}

export default Routes
