import { combineReducers } from "redux";

import playlists from '../features/playlist/playlistSlice'
import authentication from '../features/authentication/authenticationReducer'

const rootReducer = combineReducers({
    playlists,
    authentication
})

export default rootReducer