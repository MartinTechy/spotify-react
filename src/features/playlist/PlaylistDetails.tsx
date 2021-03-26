import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from './playlistSlice';

function PlaylistDetails() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPlaylists())
    }, [])


    return (<>
        {'this is the playListDetails component'}
    </>)
}

export default PlaylistDetails;