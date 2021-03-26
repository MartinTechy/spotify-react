import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatus } from "../../types/requests"
import { ErrorPayload } from "../../types/store";
import { SpotifyPlaylist } from "./playlistTypes";

export interface PlaylistReducerState {
    playlists: SpotifyPlaylist[];
    status: RequestStatus;
    error?: string;
}

export interface FetchPlaylistsSuccessPaylaod {
    playlists: SpotifyPlaylist[]
}

const initialState:PlaylistReducerState = {
    playlists: [],
    status: RequestStatus.IDLE,
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        fetchPlaylists(state) {
            state.status = RequestStatus.PENDING;
        },
        fetchPlaylistsSuccess(state, action: PayloadAction<FetchPlaylistsSuccessPaylaod>) {
            state.status = RequestStatus.SUCCESS;
            state.playlists = action.payload.playlists
            state.error = undefined
        },
        fetchPlaylistsError(state, action: PayloadAction<ErrorPayload> ) {
            state.status = RequestStatus.ERROR;
            state.error = action.payload.message;
        }
    },
});

export const { fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsError } = playlistSlice.actions;
export default playlistSlice.reducer;