export default (state = {
  processing: false,
  error: ''
}, action) => {
  switch (action.type) {
    case 'HTTP_REQUEST_START':
      return { processing: true, error: '' }
    case 'HTTP_REQUEST_SUCCESS':
      return { processing: false, error: '' }
    case 'HTTP_REQUEST_ERROR':
      return { processing: false, error: action.error }
    default:
      return state
  }
}
