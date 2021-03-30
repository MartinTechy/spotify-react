import { PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeLatest } from 'redux-saga/effects';
import { axios, PATHS } from '../../utils/axios';
import { getAccessTokenSelector } from '../authentication/authenticationSelectors';
import { searchTrack, searchTrackError, SearchTrackPayload, searchTrackSuccess } from './trackSearchSlice';

const SEARCH_LIMIT = 20;

function* searchTrackSaga({ payload }: PayloadAction<SearchTrackPayload>) {
	try {
		const { searchString } = payload;
		const accessToken:string = yield select(getAccessTokenSelector());

		const { data } = yield axios({ accessToken }).get(PATHS.SEARCH, {
			params: {
				q: searchString,
				type: 'track',
				limit: SEARCH_LIMIT
			}
		});

		yield put(searchTrackSuccess({ tracks: data.tracks.items }));
	}catch(error) {
		console.error(error);
		yield put(searchTrackError({ message: error.message }));
	}
}

export default function* trackSearchSaga(): Generator {
	yield takeLatest(searchTrack.type, searchTrackSaga);
}