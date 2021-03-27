import { takeEvery, put, select } from '@redux-saga/core/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { axios } from '../../utils/axios';
import { getAccessTokenSelector } from '../authentication/authenticationSelectors';
import { fetchTracksForPlaylist, fetchTracksForPlaylistSuccess, fetchTracksForPlaylistError, FetchTracksForPlaylistPayload } from './trackSlice';
import { Track } from './trackTypes';

function* fetchTracksForPlaylistSaga({ payload }: PayloadAction<FetchTracksForPlaylistPayload>) {
    try {
        const { playlist : { tracks } } = payload;
        
        const accessToken:string = yield select(getAccessTokenSelector());

        const { data } = yield axios({ 
            accessToken,
            baseURL: tracks.href,
        }).get('');

        const tracksResult: Track[] = data.items.map((item: {track: Track}) => item.track);

        yield put(fetchTracksForPlaylistSuccess({
            tracks: tracksResult,
        }));

    } catch(error) {
        console.error(error);
        yield put(fetchTracksForPlaylistError({
            message: error.message
        }));
    }

}


/** @internal */
export default  function* trackSaga(): Generator {
    yield takeEvery (fetchTracksForPlaylist.type, fetchTracksForPlaylistSaga);
}