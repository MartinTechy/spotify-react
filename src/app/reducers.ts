import { combineReducers } from 'redux';

import playlists from '../features/playlist/playlistSlice';
import authentication from '../features/authentication/authenticationSlice';
import tracks from '../features/track/trackSlice';
import trackSearch from '../features/trackSearch/trackSearchSlice';
import modal from '../components/Modal/modalSlice';

const rootReducer = combineReducers({
	playlists,
	authentication,
	tracks,
	trackSearch,
	modal
});

export default rootReducer;