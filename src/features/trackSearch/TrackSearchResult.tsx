import React from 'react';
import { useDispatch } from 'react-redux';
import { IoAddCircleOutline } from 'react-icons/io5';

import './TrackSearchResult.scss';

import { addTrackToPlaylist } from '../playlist/playlistSlice';
import { Track } from '../track/trackTypes';

interface Props {
    track: Track;
	onTrackAdded: () => void;
}

function TrackSearchResult({ track, onTrackAdded }: Props) {
	const dispatch = useDispatch();

	function handleClick () {
		dispatch(addTrackToPlaylist({ trackURI: track.uri }));
		onTrackAdded();
	}
	
	return (<>
		<div className="spot-track-search-result-row">
			<div className='spot-track-search-result-row__track-details'>
				<img src={`${track.album.images[0].url}`} alt='track album cover'></img>
				<div>{track.name} - {track.artists[0].name} </div>
			</div>
			<IoAddCircleOutline 
				className='spot-track-search-result-row__add-button' 
				onClick={handleClick} 
			/>
		</div>
	</>);

}

export default TrackSearchResult;