import { all, takeLatest } from 'redux-saga/effects'
import store from 'redux/store'

import services from 'lib/feathers/feathersServices'

function * fetch ({ model }) {
  const { page, sort, search } = store.getState()

  const $sort = sort[model]
  const $skip = page[model] * 25

  const query = { $sort, $skip }

  if (search[model]) { query.search = search[model] }

  const { value } = yield store.dispatch(services[model.replace(/s$/, '')].find({ query }))

  if (!value.data[0] && value.total && $skip > 0) {
    const firstPageQuery = Object.assign({}, query, { $skip: 0 })
    yield store.dispatch(services[model.replace(/s$/, '')].find({ query: firstPageQuery }))
  }
}

export default function * watchAuth () {
  yield all([
    takeLatest('SET_PAGE', fetch),
    takeLatest('SET_SORT', fetch),
    takeLatest('SET_SEARCH', fetch)
  ])
}
