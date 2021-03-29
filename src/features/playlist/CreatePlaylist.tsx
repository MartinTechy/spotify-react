import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlaylist } from './playlistSlice';

function CreatePlaylist() {
	const dispatch = useDispatch();
	const [playlistName, setPlaylistName ] = useState('');
	const [playlistDescription, setPlaylistDescription ] = useState('');

	return (<>
		<input name='playlistName' onChange={event => setPlaylistName(event.target.value)} />
		<input name='playlistDescription' onChange={event => setPlaylistDescription(event.target.value)} />
		<button onClick={() => dispatch(createPlaylist({ name: playlistName, description: playlistDescription }))}>{'Create a new playlist'}</button>
	</>);
}

export default CreatePlaylist;