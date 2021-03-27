import { all } from '@redux-saga/core/effects';

import playlistsSaga from '../features/playlist/playlistSaga';
import tracksSaga from '../features/track/trackSaga';

export default function* rootSaga() {
    yield all([
        playlistsSaga(),
        tracksSaga(),
    ]);
}