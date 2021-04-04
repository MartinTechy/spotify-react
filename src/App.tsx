import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import PlaylistDetails from './features/playlist/PlaylistDetails';
import CreatePlaylist from './features/playlist/CreatePlaylist';
import TrackSearch from './features/trackSearch/TrackSearch';
import PlaylistSelect from './features/playlist/PlaylistSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlaylistSelector, getPlaylistsSelector } from './features/playlist/playlistSelectors';
import { fetchPlaylists } from './features/playlist/playlistSlice';
import { fetchTracksForPlaylist } from './features/track/trackSlice';

function App() {
	const dispatch = useDispatch();
	const playlists = useSelector(getPlaylistsSelector());
	const currentPlaylist = useSelector(getCurrentPlaylistSelector());

	useEffect(() => {
		dispatch(fetchPlaylists());
	}, []);

	useEffect(() => {
		if(currentPlaylist) dispatch(fetchTracksForPlaylist({ playlist: currentPlaylist }));
	}, [currentPlaylist]);

	return (
		<div className='spot-app'>
			<div className='spot-app__header'>
				<TrackSearch />
				<CreatePlaylist />
			</div>
			<PlaylistSelect playlists={playlists} /> 
			<PlaylistDetails />
		</div>
	);
}

export default App;
