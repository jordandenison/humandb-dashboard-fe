import reduxifyServices from 'feathers-redux'
import feathersClient from './feathersClient'

const services = [ 'auth/status', 'auth/user' ]

export default reduxifyServices(feathersClient, services)
