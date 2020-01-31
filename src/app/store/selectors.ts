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
    wouldPageChangeOnAdd: state.clients.clients.length % state.clients.paginationParams.size === 0,
    wouldPageChangeOnDelete: state.clients.clients.length % state.clients.paginationParams.size === 1,
    totalPages: state.clients.paginationParams.totalPages,
    number: state.clients.paginationParams.number,
    first: state.clients.paginationParams.first
  }),
  getClient: (id: number) => (state: fromApp.AppState) => state.clients.clients.find(client => client.id === id)
};

export default selectors;
