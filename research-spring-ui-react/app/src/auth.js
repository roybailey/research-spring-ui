import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from './component/LoginMessage'


const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.getIn(['user','isAuthenticated']),
  authenticatingSelector: state => state.getIn(['user','isFetching']),
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
})

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/noauth',
  allowRedirectBack: false,
  authenticatedSelector: state => state.getIn(['user','isAuthenticated']) && state.getIn(['user','isAdmin']),
  predicate: user => user.get('isAdmin'),
  wrapperDisplayName: 'UserIsAdmin'
})

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => !state.getIn(['user','isAuthenticated']) && state.getIn(['user','isFetching']) === false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack: false
})
