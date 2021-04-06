import React from 'react';

import './TrackDetail.scss';

import { Track } from './trackTypes';

type Props = {
    track: Track;
}

function TrackDetail({ track }: Props) {
	const { name, album, artists } = track;

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
	</div>);
}

export default TrackDetail;