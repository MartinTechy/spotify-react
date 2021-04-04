import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CreatePlaylistModal.scss';

import Button, { BUTTON_STYLES } from '../../components/Button/Button';
import { createPlaylist, CreatePlaylistPayload } from './playlistSlice';
import { closeModal } from '../../components/Modal/modalSlice';

type OwnProps = {}

type StateProps = {}

type DispatchProps = {
	createPlaylist: (payload: CreatePlaylistPayload) => void
	closeModal: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

class CreatePlaylistModal extends Component<Props> {

	constructor(props:Props) {
		super(props);
		this.onCreatePlaylist = this.onCreatePlaylist.bind(this);
	}

	state = {
		nameInput: '',
		descriptionInput: '',
	}

	onCreatePlaylist() {
		const { nameInput, descriptionInput } = this.state;
		this.props.createPlaylist({ name: nameInput, description: descriptionInput });
		this.props.closeModal();
	}

	render () {
		return (<div className='spot-create-playlist-modal'>
			<input className='spot-create-playlist-modal__name' name='playlistName' placeholder='Playlist name' onChange={event => this.setState({ ...this.state, nameInput: event.target.value })}/>
			<textarea className='spot-create-playlist-modal__description' name='playlistDescription' placeholder="Playlist description (optional)" onChange={event => this.setState({ ...this.state, descriptionInput: event.target.value })}/>
			<div className='spot-create-playlist-modal__buttons' >
				<Button text='Cancel' onClick={() => this.props.closeModal()} style={BUTTON_STYLES.SECONDARY}/>
				<Button text='Create new Playlist' onClick={this.onCreatePlaylist} />
			</div>
		</div>);
	}
}

const mapDispatchToProps: DispatchProps = {
	createPlaylist,
	closeModal
};

export default connect(null, mapDispatchToProps)(CreatePlaylistModal);