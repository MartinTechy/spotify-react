import React from 'react';
import { useDispatch } from 'react-redux';

import './CreatePlaylistButton.scss';

import Button from '../../components/Button/Button';
import { openModal, OpenModalPayload } from '../../components/Modal/modalSlice';

const createPlaylistModal: OpenModalPayload = {
	modalHeading: 'Add new playlist',
	modalContentID: 'createPlaylist'
};

function CreatePlaylist() {
	const dispatch = useDispatch();
	return (<div className='spot-create-playlist-button'>
		<Button onClick={() => dispatch(openModal(createPlaylistModal))} text='Add new playlist'/>
	</div>);
}

export default CreatePlaylist;