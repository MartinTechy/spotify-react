import { all } from '@redux-saga/core/effects';

import playlistsSaga from '../features/playlist/playlistSaga';
import tracksSaga from '../features/track/trackSaga';
import trackSearchSaga from '../features/trackSearch/trackSearchSaga';

export default function* rootSaga() {
	yield all([
		playlistsSaga(),
		tracksSaga(),
		trackSearchSaga(),
	]);
}