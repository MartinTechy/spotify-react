import { put, select, takeEvery } from '@redux-saga/core/effects';
import {  PayloadAction } from '@reduxjs/toolkit';
import { axios, PATHS } from '../../utils/axios';
import { getAccessTokenSelector, getUserIDSelector } from '../authentication/authenticationSelectors';
import { fetchTracksForPlaylist } from '../track/trackSlice';
import { getCurrentPlaylistIDSelector, getCurrentPlaylistSelector } from './playlistSelectors';
import { 
	addTrackToPlaylist, 
	addTrackToPlaylistError, 
	addTrackToPlaylistSuccess, 
	createPlaylist, 
	createPlaylistError, 
	createPlaylistSuccess, 
	editCurrentPlayListDetails, 
	editCurrentPlayListDetailstSuccess,
	editCurrentPlayListDetailsError,
	fetchPlaylists, 
	fetchPlaylistsError, 
	fetchPlaylistsSuccess, 
	removeTrackFromPlaylist,
	removeTrackFromPlaylistSuccess,
	removeTrackFromPlaylistError
} from './playlistSlice';
import { 
	AddTrackToPlaylistPayload, 
	CreatePlaylistPayload, 
	EditCurrentPlaylistDetailsPayload, 
	RemoveTrackFromPlaylistPayload, 
	SpotifyPlaylist 
} from './playlistTypes';

function* fetchPlaylistsSaga() {
	try {
		const accessToken:string = yield select(getAccessTokenSelector());
    
		const { data } = yield axios({ accessToken }).get(PATHS.PLAYLISTS, {});

		yield put(fetchPlaylistsSuccess({ playlists: data.items }));
	} catch (error) {
		console.error(error);
		yield put(fetchPlaylistsError({
			message: error.message
		}));
	}

}

function* createPlaylistSaga({ payload }: PayloadAction<CreatePlaylistPayload>) {
	try {
		const { name, description, isPrivate } = payload;
		const accessToken:string = yield select(getAccessTokenSelector());
		const userID:string = yield select(getUserIDSelector());
    
		const { data } = yield axios({ accessToken }).post(PATHS.CREATE_PLAYLIST(userID), {
			name, 
			description,
			public: !isPrivate
		});

		yield put(createPlaylistSuccess({ playlist: data }));
	} catch (error) {
		console.error(error);
		yield put(createPlaylistError({
			message: error.message
		}));
	}

}

function* addTrackToPlaylistSaga({ payload } : PayloadAction<AddTrackToPlaylistPayload>) {
	try {
		const accessToken:string = yield select(getAccessTokenSelector());
		const currentPlaylist:SpotifyPlaylist = yield select(getCurrentPlaylistSelector());
		const { trackURI } = payload;

		yield axios({ accessToken }).post(PATHS.ADD_TRACK(currentPlaylist.id), {} , {
			params : {
				uris: trackURI,
				position: 0
			},
		});

		yield put(addTrackToPlaylistSuccess());
		yield put(fetchTracksForPlaylist({ playlist: currentPlaylist }));

	} catch(error) {
		console.error(error);
		yield put(addTrackToPlaylistError({
			message: error.message
		}));
	}
}

function* editCurrentPlaylistDetailsSaga({ payload } : PayloadAction<EditCurrentPlaylistDetailsPayload>) {
	try {
		const accessToken:string = yield select(getAccessTokenSelector());
		const currentPlaylistID:string = yield select(getCurrentPlaylistIDSelector());
		const { name, description } = payload;

		yield axios({ accessToken }).put(PATHS.EDIT_PLAYLIST(currentPlaylistID), {
			name,
			description
		});

		yield put(editCurrentPlayListDetailstSuccess({
			name,
			description
		}));

	} catch(error) {
		console.error(error);
		yield put(editCurrentPlayListDetailsError({
			message: error.message
		}));
	}
}

function* removeTrackFromPlaylistSaga({ payload } : PayloadAction<RemoveTrackFromPlaylistPayload>) {
	try {
		const accessToken:string = yield select(getAccessTokenSelector());
		const currentPlaylist:SpotifyPlaylist = yield select(getCurrentPlaylistSelector());
		const { trackURI, position } = payload;

		yield axios({ accessToken }).delete(PATHS.ADD_TRACK(currentPlaylist.id), {
			data: {
				tracks: [
					{ 
						uri: trackURI,
						positions: [
							position
						]
					}
				]
			}
		});

		yield put(removeTrackFromPlaylistSuccess());
		yield put(fetchTracksForPlaylist({ playlist: currentPlaylist }));

	} catch(error) {
		console.error(error);
		yield put(removeTrackFromPlaylistError({
			message: error.message
		}));
	}
}

/** @internal */
export default  function* playListSaga(): Generator {
	yield takeEvery(fetchPlaylists.type, fetchPlaylistsSaga );
	yield takeEvery(createPlaylist.type, createPlaylistSaga );
	yield takeEvery(addTrackToPlaylist.type, addTrackToPlaylistSaga );
	yield takeEvery(editCurrentPlayListDetails.type, editCurrentPlaylistDetailsSaga);
	yield takeEvery(removeTrackFromPlaylist.type, removeTrackFromPlaylistSaga);
}