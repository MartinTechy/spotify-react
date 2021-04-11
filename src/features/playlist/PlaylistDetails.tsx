import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import './PlaylistDetails.scss';

import TrackDetail from '../track/TrackDetail';
import { getTracksSelector } from '../track/trackSelectors';
import { Track } from '../track/trackTypes';

enum SortOrder {
	ASC = 'ASC',
	DESC = 'DESC',
	NONE = '',
}

enum SortField {
	NAME = 'name',
	ALBUM = 'album',
	RELEASE = 'release',
	NONE = ''
}

function PlaylistDetails() {
	const tracks = useSelector(getTracksSelector());
	const [sortField, setSortField] = useState(SortField.NONE);
	const [sortOrder, setSortOrder] = useState(SortOrder.NONE);

	function handleClick(field:SortField) {
		if(field !== sortField) {
			setSortField(field);
			setSortOrder(SortOrder.ASC);
		} else {
			switch(sortOrder) {
			case SortOrder.ASC:
				setSortOrder(SortOrder.DESC);
				break;
			case SortOrder.DESC:
				setSortField(SortField.NONE);
				setSortOrder(SortOrder.NONE);
				break;
			case SortOrder.NONE:
				setSortOrder(SortOrder.ASC);
				break;
			}
		}
	}

	function sortPlaylist(firstTrack: Track, secondTrack: Track): number {
		let comparisonResult = 0;
		switch(sortField) {
		case SortField.NAME: 
			comparisonResult = firstTrack.name.localeCompare(secondTrack.name);
			break;
		case SortField.ALBUM:
			comparisonResult =firstTrack.album.name.localeCompare(secondTrack.album.name);
			break;
		case SortField.RELEASE:
			comparisonResult =firstTrack.album.release_date.localeCompare(secondTrack.album.release_date);
			break;
		}
		return sortOrder === SortOrder.ASC ? comparisonResult : -(comparisonResult);
	}

	const SortArrow = sortOrder === SortOrder.ASC ? IoCaretUp : IoCaretDown ; 

	return (<div className='spot-playlist-details'>
		<div className='spot-playlist-details__columns'>
			<div className='spot-playlist-details__album-cover'/>
			<div className='spot-playlist-details__track-info' onClick={() => handleClick(SortField.NAME)} >Name {sortField === 'name' && <SortArrow />}</div>
			<div className='spot-playlist-details__album-name' onClick={() => handleClick(SortField.ALBUM)} >Album {sortField === 'album' && <SortArrow />}</div>
			<div className='spot-playlist-details__release-date' onClick={() => handleClick(SortField.RELEASE)} >Release date {sortField === 'release' && <SortArrow />}</div>
			<div className='spot-playlist-details__track-actions'></div>
		</div>
		<div className='spot-playlist-details__tracks'>
			{[...tracks].sort(sortPlaylist).map((track, index) => (<TrackDetail key={`track-detail-${track.id}-${index}`} track={track} trackIndex={index} />))}
		</div>
	</div>);
}

export default PlaylistDetails;