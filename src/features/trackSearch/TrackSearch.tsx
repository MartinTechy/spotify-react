import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackToPlaylist } from '../playlist/playlistSlice';
import { getSearchResultsSelector } from './trackSearchSelectors';
import { searchTrack } from './trackSearchSlice';

function TrackSearch() {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');
	const results = useSelector(getSearchResultsSelector());

	return (<>
		<div>
			<input type="text" onChange={event => setInputValue(event.target.value)} />
			{results.map(track => (<div key={`track-search-${track.id}`} >{track.name} - {track.artists[0].name} <button onClick={() => dispatch(addTrackToPlaylist({ trackURI: track.uri }))} >Add to Playlist</button></div>))}
		</div>
		<div>
			<button onClick={() => dispatch(searchTrack({ searchString: inputValue }))} >{'Search'}</button>
		</div>
	</>);
}

export default TrackSearch;