import { RootState } from '../../app/store';
import { RequestStatus } from '../../types/requests';

export const getSearchResultsSelector = () => (state:RootState) => state.trackSearch.result;

export const getIsTrackSearchLoadingSelector = () => (state: RootState) => state.trackSearch.status === RequestStatus.PENDING;