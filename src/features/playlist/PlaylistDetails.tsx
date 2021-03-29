import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TrackDetail from '../track/TrackDetail';
import PlaylistSelect from './PlaylistSelect';

import { getTracksSelector } from '../track/trackSelectors';
import { fetchTracksForPlaylist } from '../track/trackSlice';
import { getCurrentPlaylistSelector, getPlaylistsSelector } from './playlistSelectors';
import { fetchPlaylists } from './playlistSlice';
import TrackSearch from '../trackSearch/TrackSearch';
import CreatePlaylist from './CreatePlaylist';

function PlaylistDetails() {
	const dispatch = useDispatch();
	const playlists = useSelector(getPlaylistsSelector()); 
	const currentPlaylist = useSelector(getCurrentPlaylistSelector());
	const tracks = useSelector(getTracksSelector());

	useEffect(() => {
		dispatch(fetchPlaylists());
	}, []);

	useEffect(() => {
		if(currentPlaylist) dispatch(fetchTracksForPlaylist({ playlist: currentPlaylist }));
	}, [currentPlaylist]);


	return (<>
		<div>
			<CreatePlaylist />
		</div>
		<div>
			<TrackSearch />
		</div>
		<div>
			<PlaylistSelect playlists={playlists} /> 
			{currentPlaylist?.description}<br />
		</div>
		<div>
			{tracks.map(track => (<TrackDetail key={`track-detail-${track.id}`} track={track} />))}
		</div>
	</>);
}

export default PlaylistDetails;