import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrackDetail from '../track/TrackDetail';
import { getTracksSelector } from '../track/trackSelectors';
import { fetchTracksForPlaylist } from '../track/trackSlice';
import { getCurrentPlaylistSelector, getPlaylistsSelector } from './playlistSelectors';
import { fetchPlaylists } from './playlistSlice';

function PlaylistDetails() {
    const dispatch = useDispatch()
    const playlists = useSelector(getPlaylistsSelector()); 
    const currentPlaylist = useSelector(getCurrentPlaylistSelector());
    const tracks = useSelector(getTracksSelector());

    useEffect(() => {
        dispatch(fetchPlaylists())
    }, [])

    useEffect(() => {
        if(currentPlaylist) dispatch(fetchTracksForPlaylist({playlist: currentPlaylist}))
    }, [currentPlaylist])


    return (<>
        {tracks.map(track => (<TrackDetail key={`track-detail-${track.id}`} track={track} />))}
    </>)
}

export default PlaylistDetails;