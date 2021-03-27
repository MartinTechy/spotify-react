import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../types/requests';
import { ErrorPayload } from '../../types/store';
import { Track } from '../track/trackTypes';

export interface TrackSearchReducerState {
    result: Track[];
    status: RequestStatus;
    error?: string;
}

export interface SearchTrackPayload {
    searchString: string;
}

export interface SearchTrackSuccessPayload {
    tracks: Track[];
}

const initialState: TrackSearchReducerState = {
	result: [],
	status: RequestStatus.IDLE,
};

const trackSearchSlice = createSlice({
	name: 'trackSearch',
	initialState,
	reducers: {
		searchTrack(state, action: PayloadAction<SearchTrackPayload>) {
			state.status = RequestStatus.PENDING;
		},
		searchTrackSuccess(state, action: PayloadAction<SearchTrackSuccessPayload>) {
			state.status = RequestStatus.SUCCESS;
			state.result = action.payload.tracks;
		},
		searchTrackError(state, action: PayloadAction<ErrorPayload>) {
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
		}
	}
});

export const { searchTrack, searchTrackSuccess, searchTrackError } = trackSearchSlice.actions;
export default trackSearchSlice.reducer;