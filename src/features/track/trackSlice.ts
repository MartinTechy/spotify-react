import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../types/requests';
import { ErrorPayload } from '../../types/store';
import { SpotifyPlaylist } from '../playlist/playlistTypes';
import { Track } from './trackTypes';

export interface TrackReducerState {
    tracks: Track[];
    status: RequestStatus;
    error?: string;
}

export interface FetchTracksForPlaylistPayload {
    playlist: SpotifyPlaylist;
}

export interface FetchTracksForPlaylistSuccessPayload {
    tracks: Track[];
}

const initialState: TrackReducerState = {
	tracks: [],
	status: RequestStatus.IDLE,
};

const trackSlice = createSlice({
	name: 'tracks',
	initialState,
	reducers: {
		fetchTracksForPlaylist(state, action: PayloadAction<FetchTracksForPlaylistPayload>) {
			state.status = RequestStatus.PENDING;
		},
		fetchTracksForPlaylistSuccess(state, action: PayloadAction<FetchTracksForPlaylistSuccessPayload>) {
			state.status = RequestStatus.SUCCESS;
			state.tracks = action.payload.tracks;
		},
		fetchTracksForPlaylistError(state, action: PayloadAction<ErrorPayload>) {
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
		}
	}
});

export const { fetchTracksForPlaylist, fetchTracksForPlaylistSuccess, fetchTracksForPlaylistError } = trackSlice.actions;
export default trackSlice.reducer;