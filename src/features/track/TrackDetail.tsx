import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { removeTrackFromPlaylist } from '../playlist/playlistSlice';

import './TrackDetail.scss';

import { Track } from './trackTypes';

type Props = {
    track: Track;
	trackIndex: number;
}

function TrackDetail({ track, trackIndex }: Props) {
	const { name, album, artists, uri } = track;
	const dispatch = useDispatch();


	return (<div className='spot-track-detail'>
		<div className='spot-track-detail__album-cover'>
			<img src={album.images[0].url} alt='album cover' />
		</div>
		<div className='spot-track-detail__track-info'>
			<div>
				{name}
			</div>
			<div>
				{artists.map(artist => artist.name).join(', ')}
			</div>
		</div>
		<div className='spot-track-detail__album-name'>
			{album.name}
		</div>
		<div className='spot-track-detail__release-date'>
			{album.release_date}
		</div>
		<div className='spot-track-detail__track-actions'>
			<IoTrash 
				className='spot-track-detail__delete-button' 
				onClick={() => dispatch(removeTrackFromPlaylist({ trackURI: uri, position: trackIndex }))}
			/>
		</div>
	</div>);
}

export default TrackDetail;