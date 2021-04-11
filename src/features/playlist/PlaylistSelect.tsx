import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

import './PlaylistSelect.scss';

import { getCurrentPlaylistIDSelector, getCurrentPlaylistSelector } from './playlistSelectors';
import { setCurrentPlaylist } from './playlistSlice';
import { SpotifyPlaylist } from './playlistTypes';
import CreateEditPlaylistButton from './CreateEditPlaylistButton';
import { getUserIDSelector } from '../authentication/authenticationSelectors';

type Props = {
    playlists: SpotifyPlaylist[];
}

function PlaylistSelect({ playlists }: Props) {
	const dispatch = useDispatch();
	const currentPlaylistID = useSelector(getCurrentPlaylistIDSelector());
	const currentPlaylist = useSelector(getCurrentPlaylistSelector());
	const userID = useSelector(getUserIDSelector());

	return (<div className='spot-playlist-select'>
		<select className='spot-playlist-select__input' onChange={event => dispatch(setCurrentPlaylist({ id: event.target.value }))} value={currentPlaylistID}>
			{playlists && playlists.map(playlist => (<option key={`playlist-select-${playlist.id}`} value={playlist.id}>{playlist.name}</option>))}
		</select>
		{currentPlaylist?.description && <div className='spot-playlist-select__description'>
			{currentPlaylist?.description}
		</div>}
		{userID === currentPlaylist?.owner.id && <div className='spot-playlist-select__edit-button'>
			<CreateEditPlaylistButton editMode />
		</div>}
	</div>);
}

export default PlaylistSelect;