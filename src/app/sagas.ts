import { all } from "@redux-saga/core/effects";
import playlistsSaga from '../features/playlist/playlistSaga'

export default function* rootSaga() {
    yield all([
        playlistsSaga(),
    ])
}