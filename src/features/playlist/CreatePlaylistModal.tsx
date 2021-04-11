import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CreatePlaylistModal.scss';

import Button, { BUTTON_STYLES } from '../../components/Button/Button';
import { createPlaylist, editCurrentPlayListDetails } from './playlistSlice';
import { closeModal } from '../../components/Modal/modalSlice';
import { CreatePlaylistPayload, EditCurrentPlaylistDetailsPayload } from './playlistTypes';
import { RootState } from '../../app/store';
import { getCurrentPlaylistDescriptionSelector, getCurrentPlaylistNameSelector } from './playlistSelectors';

type OwnProps = {
	editMode?: true;
}

type StateProps = {
	name?: string,
	description?: string;
}

type DispatchProps = {
	createPlaylist: (payload: CreatePlaylistPayload) => void
	closeModal: () => void,
	editCurrentPlayListDetails: (payload: EditCurrentPlaylistDetailsPayload) => void
}

type Props = OwnProps & StateProps & DispatchProps;

class CreatePlaylistModal extends Component<Props> {

	constructor(props:Props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	state = {
		nameInput: this.props.name || '',
		descriptionInput: this.props.description || '',
	}

	onSubmit() {
		const { nameInput, descriptionInput } = this.state;
		const { editMode } = this.props;
		if(editMode) {
			this.props.editCurrentPlayListDetails({ name: nameInput, description: descriptionInput });
		} else {
			this.props.createPlaylist({ name: nameInput, description: descriptionInput });
		}
		this.props.closeModal();
	}

	render () {
		const { editMode } = this.props;
		const { nameInput, descriptionInput } = this.state;
		return (<div className='spot-create-playlist-modal'>
			<input 
				className='spot-create-playlist-modal__name' 
				name='playlistName' 
				placeholder='Playlist name' 
				onChange={event => this.setState({ ...this.state, nameInput: event.target.value })} 
				value={nameInput}
			/>
			<textarea 
				className='spot-create-playlist-modal__description' 
				name='playlistDescription' 
				placeholder="Playlist description (optional)" 
				onChange={event => this.setState({ ...this.state, descriptionInput: event.target.value })} 
				value={descriptionInput} 
			/>
			<div className='spot-create-playlist-modal__buttons' >
				<Button text='Cancel' onClick={() => this.props.closeModal()} style={BUTTON_STYLES.SECONDARY}/>
				<Button text={`${editMode ? 'Edit' : 'Create new Playlist'}`} onClick={this.onSubmit} />
			</div>
		</div>);
	}
}

const mapStateToProps = (state:RootState, props: OwnProps): StateProps =>  {
	const { editMode } = props;
	if( editMode ) {
		const name = getCurrentPlaylistNameSelector()(state);
		const description = getCurrentPlaylistDescriptionSelector()(state);
		return { name, description };
	}
	return {};
};

const mapDispatchToProps: DispatchProps = {
	createPlaylist,
	closeModal,
	editCurrentPlayListDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistModal);