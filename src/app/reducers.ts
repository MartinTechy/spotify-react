import { combineReducers } from 'redux';

import playlists from '../features/playlist/playlistSlice';
import authentication from '../features/authentication/authenticationSlice';
import tracks from '../features/track/trackSlice';

const rootReducer = combineReducers({
    playlists,
    authentication,
    tracks
});

export default rootReducer;