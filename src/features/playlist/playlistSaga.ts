import { put, select, takeEvery } from "@redux-saga/core/effects";
import { axios, PATHS } from "../../utils/axios";
import { getAccessTokenSelector } from "../authentication/authenticationSelectors";
import { fetchPlaylists, fetchPlaylistsError, fetchPlaylistsSuccess } from "./playlistSlice";

function* fetchPlaylistsSaga() {
    try {
        const accessToken:string = yield select(getAccessTokenSelector());
    
        const { data } = yield axios({accessToken}).get(PATHS.PLAYLISTS, {})

        yield put(fetchPlaylistsSuccess({playlists: data.items}))
    } catch (error) {
        console.error(error);
        yield put(fetchPlaylistsError({
            message: error.message
        }))
    }

}

/** @internal */
export default  function* playListSaga(): Generator {
    yield takeEvery(fetchPlaylists.type, fetchPlaylistsSaga );
}