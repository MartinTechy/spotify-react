import React from 'react';
import { useSelector } from 'react-redux';

import TrackDetail from '../track/TrackDetail';

import { getTracksSelector } from '../track/trackSelectors';

function PlaylistDetails() {
	const tracks = useSelector(getTracksSelector());
	return (<div className='spot-playlist-details'>
		{tracks.map((track, index) => (<TrackDetail key={`track-detail-${track.id}-${index}`} track={track} trackIndex={index} />))}
	</div>);
}

export default PlaylistDetails;