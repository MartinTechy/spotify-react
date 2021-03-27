import React from 'react'; 
import { useDispatch } from 'react-redux';
import { setCurrentPlaylist } from './playlistSlice';
import { SpotifyPlaylist } from './playlistTypes';

type Props = {
    playlists: SpotifyPlaylist[];
}

function PlaylistSelect({ playlists }: Props) {
	const dispatch = useDispatch();

	return (<select onChange={event => dispatch(setCurrentPlaylist({ id: event.target.value }))}>
		{playlists && playlists.map(playlist => (<option key={`playlist-select-${playlist.id}`} value={playlist.id}>{playlist.name}</option>))}
	</select>);
}

export default PlaylistSelect;