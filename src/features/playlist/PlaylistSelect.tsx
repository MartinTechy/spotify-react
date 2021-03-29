import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlaylistIDSelector } from './playlistSelectors';
import { setCurrentPlaylist } from './playlistSlice';
import { SpotifyPlaylist } from './playlistTypes';

type Props = {
    playlists: SpotifyPlaylist[];
}

function PlaylistSelect({ playlists }: Props) {
	const dispatch = useDispatch();
	const currentPlaylistID = useSelector(getCurrentPlaylistIDSelector());

	return (<select onChange={event => dispatch(setCurrentPlaylist({ id: event.target.value }))} value={currentPlaylistID}>
		{playlists && playlists.map(playlist => (<option key={`playlist-select-${playlist.id}`} value={playlist.id}>{playlist.name}</option>))}
	</select>);
}

export default PlaylistSelect;