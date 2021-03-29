import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../types/requests';
import { ErrorPayload } from '../../types/store';
import { SpotifyPlaylist } from './playlistTypes';

export interface PlaylistReducerState {
    playlists: SpotifyPlaylist[];
    currentPlaylistID: string;
    status: RequestStatus;
    error?: string;
}

export interface FetchPlaylistsSuccessPaylaod {
    playlists: SpotifyPlaylist[]
}

export interface SetCurrentPlaylistIDPayload {
    id: string;
}

export interface CreatePlaylistPayload {
	name: string;
	description: string;
	isPrivate?: boolean;
}

export interface CreatePlaylistSuccessPayload {
	playlist: SpotifyPlaylist;
}

const initialState:PlaylistReducerState = {
	playlists: [],
	currentPlaylistID: '',
	status: RequestStatus.IDLE,
};

const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		fetchPlaylists(state) {
			state.status = RequestStatus.PENDING;
		},
		fetchPlaylistsSuccess(state, action: PayloadAction<FetchPlaylistsSuccessPaylaod>) {
			state.status = RequestStatus.SUCCESS;
			state.playlists = action.payload.playlists;
			state.currentPlaylistID = action.payload.playlists[0].id;
			state.error = undefined;
		},
		fetchPlaylistsError(state, action: PayloadAction<ErrorPayload> ) {
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
		},
		createPlaylist(state, action: PayloadAction<CreatePlaylistPayload>){
			state.status = RequestStatus.PENDING;
		},
		createPlaylistSuccess(state, action: PayloadAction<CreatePlaylistSuccessPayload>){
			const { playlist } = action.payload;
			state.status = RequestStatus.SUCCESS;
			state.playlists = [playlist, ...state.playlists];
			state.currentPlaylistID = playlist.id;
		},
		createPlaylistError(state, action: PayloadAction<ErrorPayload>){
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
		},
		setCurrentPlaylist(state, action: PayloadAction<SetCurrentPlaylistIDPayload>) {
			const { id } = action.payload;
			if(state.playlists.findIndex(playlist => playlist.id === id ) !== -1) state.currentPlaylistID = id;
			else state.error = `Invalid playlist id: ${id}`;
		},
	},
});

export const { 
	fetchPlaylists, 
	fetchPlaylistsSuccess, 
	fetchPlaylistsError, 
	setCurrentPlaylist, 
	createPlaylist, 
	createPlaylistSuccess, 
	createPlaylistError 
} = playlistSlice.actions;
export default playlistSlice.reducer;