import { put, select, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { axios, PATHS } from '../../utils/axios';
import { getAccessTokenSelector, getUserIDSelector } from '../authentication/authenticationSelectors';
import { createPlaylist, createPlaylistError, CreatePlaylistPayload, createPlaylistSuccess, fetchPlaylists, fetchPlaylistsError, fetchPlaylistsSuccess } from './playlistSlice';

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
		console.log(data);

		yield put(createPlaylistSuccess({ playlist: data }));
	} catch (error) {
		console.error(error);
		yield put(createPlaylistError({
			message: error.message
		}));
	}

}

/** @internal */
export default  function* playListSaga(): Generator {
	yield takeEvery(fetchPlaylists.type, fetchPlaylistsSaga );
	yield takeEvery(createPlaylist.type, createPlaylistSaga );
}