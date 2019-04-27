import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import services from 'lib/feathers/feathersServices'
import feathersAuthentication from 'lib/feathers/feathersAuthentication'
import currentUser from 'redux/reducers/currentUser'
import page from './reducers/page'
import sort from './reducers/sort'
import search from './reducers/search'
import http from './reducers/http'

const reducers = {
  auth: feathersAuthentication.reducer,
  currentUser,
  page,
  sort,
  search,
  http,
  user: services['auth/user'].reducer,
  status: services['auth/status'].reducer,
  form: formReducer,
  router: routerReducer
}

export default combineReducers(reducers)
