import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../types/requests';
import { ErrorPayload } from '../../types/store';
import { 
	FetchPlaylistsSuccessPayload, 
	PlaylistReducerState, 
	CreatePlaylistPayload, 
	CreatePlaylistSuccessPayload,
	SetCurrentPlaylistIDPayload,
	AddTrackToPlaylistPayload,
	EditCurrentPlaylistDetailsPayload,
	EditCurrentPlaylistDetailsSuccessPayload
} from './playlistTypes';


const initialState: PlaylistReducerState = {
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
		fetchPlaylistsSuccess(state, action: PayloadAction<FetchPlaylistsSuccessPayload>) {
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
		addTrackToPlaylist(state, action: PayloadAction<AddTrackToPlaylistPayload>) {
			state.status = RequestStatus.PENDING;
		},
		addTrackToPlaylistSuccess(state) {
			state.status = RequestStatus.SUCCESS;
		},
		addTrackToPlaylistError(state, action: PayloadAction<ErrorPayload>) {
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
		},
		editCurrentPlayListDetails(state, action: PayloadAction<EditCurrentPlaylistDetailsPayload>) {
			const { name, description } = action.payload;
			const { currentPlaylistID, playlists } = state;
			const currentPlaylistIndex = playlists.findIndex(playlist => playlist.id === currentPlaylistID);

			state.playlists[currentPlaylistIndex].name = name;
			state.playlists[currentPlaylistIndex].description = description;
			state.status = RequestStatus.PENDING;
		},
		editCurrentPlayListDetailstSuccess(state, action: PayloadAction<EditCurrentPlaylistDetailsSuccessPayload>) {
			state.status = RequestStatus.SUCCESS;
		},
		editCurrentPlayListDetailsError(state, action: PayloadAction<ErrorPayload>) {
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
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
	createPlaylistError,
	addTrackToPlaylist,
	addTrackToPlaylistSuccess,
	addTrackToPlaylistError,
	editCurrentPlayListDetails,
	editCurrentPlayListDetailstSuccess,
	editCurrentPlayListDetailsError,
} = playlistSlice.actions;
export default playlistSlice.reducer;