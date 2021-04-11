import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import PlaylistDetails from './features/playlist/PlaylistDetails';
import CreateEditPlaylistButton from './features/playlist/CreateEditPlaylistButton';
import TrackSearch from './features/trackSearch/TrackSearch';
import PlaylistSelect from './features/playlist/PlaylistSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlaylistSelector, getPlaylistsSelector } from './features/playlist/playlistSelectors';
import { fetchPlaylists } from './features/playlist/playlistSlice';
import { fetchTracksForPlaylist } from './features/track/trackSlice';
import Modal from './components/Modal/Modal';
import { getIsAuthenticated } from './features/authentication/authenticationSelectors';

function App() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(getIsAuthenticated());
	const playlists = useSelector(getPlaylistsSelector());
	const currentPlaylist = useSelector(getCurrentPlaylistSelector());

	useEffect(() => {
		if(isAuthenticated) {
			dispatch(fetchPlaylists());
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if(currentPlaylist) dispatch(fetchTracksForPlaylist({ playlist: currentPlaylist }));
	}, [currentPlaylist]);

	return (<>
		<div className='spot-app'>
			<div className='spot-app__header'>
				<TrackSearch />
				<CreateEditPlaylistButton />
			</div>
			<div className='spot-app__playlist-selector'>
				<PlaylistSelect playlists={playlists} /> 
			</div>
			<div className='spot-app__playlist-details'>
				<PlaylistDetails />
			</div>
		</div>
		<Modal />
	</>);
}

export default App;
