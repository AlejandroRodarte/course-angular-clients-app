import * as fromApp from './app.reducer';

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

  getDownloadProgress: (state: fromApp.AppState) => state.clients.downloadProgress

};

export default selectors;
