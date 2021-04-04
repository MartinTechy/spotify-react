import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

import './PlaylistSelect.scss';

import { getCurrentPlaylistDescriptionSelector, getCurrentPlaylistIDSelector } from './playlistSelectors';
import { setCurrentPlaylist } from './playlistSlice';
import { SpotifyPlaylist } from './playlistTypes';

type Props = {
    playlists: SpotifyPlaylist[];
}

function PlaylistSelect({ playlists }: Props) {
	const dispatch = useDispatch();
	const currentPlaylistID = useSelector(getCurrentPlaylistIDSelector());
	const currentPlaylistDescription = useSelector(getCurrentPlaylistDescriptionSelector());

	return (<div className='spot-playlist-select'>
		<select className='spot-playlist-select__input' onChange={event => dispatch(setCurrentPlaylist({ id: event.target.value }))} value={currentPlaylistID}>
			{playlists && playlists.map(playlist => (<option key={`playlist-select-${playlist.id}`} value={playlist.id}>{playlist.name}</option>))}
		</select>
		<div className='spot-playlist-select__description'>
			{currentPlaylistDescription}
		</div>
	</div>);
}

export default PlaylistSelect;