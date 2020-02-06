import * as fromApp from './app.reducer';
import { Role } from '../shared/models/role';

export interface PageRedirectionParams {
  wouldPageChangeOnAdd: boolean;
  wouldPageChangeOnDelete: boolean;
  totalPages: number;
  number: number;
  first: boolean;
}

const selectors = {

  pageRedirection: (state: fromApp.AppState) => ({
    wouldPageChangeOnAdd: state.clients.paginationParams.totalElements % state.clients.paginationParams.size === 0,
    wouldPageChangeOnDelete: state.clients.paginationParams.totalElements % state.clients.paginationParams.size === 1,
    totalPages: state.clients.paginationParams.totalPages,
    number: state.clients.paginationParams.number,
    first: state.clients.paginationParams.first
  }),

  getCurrentPage: (state: fromApp.AppState) => state.clients.paginationParams.number,

  getSelectedClient: (state: fromApp.AppState) => state.clients.selectedClient,

  getDownloadProgress: (state: fromApp.AppState) => state.clients.downloadProgress,

  getRegions: (state: fromApp.AppState) => state.regions.regions,

  isAuthenticated: (state: fromApp.AppState) => state.auth.accessToken && state.auth.user ? true : false,

  getUsername: (state: fromApp.AppState) => state.auth.user ? state.auth.user.username : null,

  getAccessToken: (state: fromApp.AppState) => state.auth.accessToken,

  getRefreshToken: (state: fromApp.AppState) => state.auth.refreshToken,

  getRoles: (state: fromApp.AppState) => state.auth.user ? state.auth.user.roles.map((role: Role) => role.name) : null,

  isAdmin: (state: fromApp.AppState) => state.auth.user ?
  state.auth.user.roles.map((role: Role) => role.name).includes('ROLE_ADMIN') : false

};

export default selectors;
