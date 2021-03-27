import { RootState } from '../../app/store';

export const getSearchResultsSelector = () => (state:RootState) => state.trackSearch.result;