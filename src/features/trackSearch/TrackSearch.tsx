import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSearchResultsSelector } from './trackSearchSelectors';
import { clearSearchResults, searchTrack } from './trackSearchSlice';
import TrackSearchResult from './TrackSearchResult';

import './TrackSearch.scss';
import Button from '../../components/Button/Button';

interface Props {
	searchOnChange?: true;
}

const SEARCH_MIN_LENGTH = 2;

function TrackSearch({ searchOnChange }: Props) {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');
	const [showResults, setShowResults] = useState(false);
	const results = useSelector(getSearchResultsSelector());
	const inputRef = useRef<HTMLInputElement>(null);

	function  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		if(searchOnChange && value.length > SEARCH_MIN_LENGTH){
			dispatch(searchTrack({ searchString: value }));
			setShowResults(true);
		} else if (searchOnChange && value.length <= SEARCH_MIN_LENGTH) {
			setShowResults(false);
		} else if(value.length === 0) {
			setShowResults(false);
		}

		setInputValue(value);
	};

	function onTrackAdded() {
		setShowResults(false);
	}

	function onTrackSearch() {

		if(inputValue.length === 0) {
			dispatch(clearSearchResults());
		} else {
			setShowResults(true);
			dispatch(searchTrack({ searchString: inputValue }));
		}
		
		if(inputRef.current) {
			inputRef.current.focus();
		}	
	}

	return (<div className='spot-track-search'>
		<input 
			ref={inputRef}
			className='spot-track-search__field' 
			type="text" 
			placeholder='Search for a track' 
			onChange={handleChange} 
			onBlur={() => setShowResults(false)}
			onFocus={() => setShowResults(true)}
		/>
		<div className='spot-track-search__results'>
			{showResults && results.map(track => (<TrackSearchResult key={`track-search-${track.id}`} track={track} onTrackAdded={onTrackAdded} />))}
		</div>
		<div className='spot-track-search__button'>
			{ !searchOnChange && <Button onClick={onTrackSearch} text='Search' />}
		</div>
	</div>);
}

export default TrackSearch;