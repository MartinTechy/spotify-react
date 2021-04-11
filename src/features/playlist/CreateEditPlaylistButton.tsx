import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../components/Button/Button';
import { openModal, OpenModalPayload } from '../../components/Modal/modalSlice';

const createPlaylistModal: OpenModalPayload = {
	modalHeading: 'Add new playlist',
	modalContentID: 'createPlaylist'
};

const editPlaylistModal: OpenModalPayload = {
	modalHeading: 'Edit your playlist details',
	modalContentID: 'createPlaylist',
	modalProps: {
		editMode: true,
	}
};

type OwnProps = {
	editMode?: true;
}

function CreateEditPlaylistButton({ editMode }: OwnProps) {
	const dispatch = useDispatch();

	function handleOnClick() {
		editMode ? dispatch(openModal(editPlaylistModal)) : dispatch(openModal(createPlaylistModal));
	}

	return (<div className='spot-create-playlist-button'>
		<Button onClick={handleOnClick} text={`${editMode ? 'Edit' :'Add new playlist'}`}/>
	</div>);
}

export default CreateEditPlaylistButton;