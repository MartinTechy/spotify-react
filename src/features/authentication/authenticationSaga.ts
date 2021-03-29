import { put, select, takeEvery } from '@redux-saga/core/effects';
import { axios, PATHS } from '../../utils/axios';
import { getAccessTokenSelector } from './authenticationSelectors';
import { fetchUserID, fetchUserIDError, fetchUserIDSuccess } from './authenticationSlice';

function* fetchUserIDSaga() {
	try {

		const accessToken:string = yield select(getAccessTokenSelector());

		const { data } = yield axios({ accessToken }).get(PATHS.USER_SELF);

		yield put(fetchUserIDSuccess({ userID: data.id }));
	}catch(error) {
		console.error(error);
		yield put(fetchUserIDError({ message: error.message }));
	}
}


/** @internal */
export default function* authenticationSaga(): Generator {
	yield takeEvery(fetchUserID.type, fetchUserIDSaga);
}