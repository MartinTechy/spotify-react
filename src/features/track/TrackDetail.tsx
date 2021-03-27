import React from 'react';
import { Track } from './trackTypes';

type Props = {
    track: Track;
}


function TrackDetail({ track }: Props) {
    const { name, album } = track;

    return (<>
        {`${name} - ${album.name} - ${album.release_date}`}<br />
    </>);
}

export default TrackDetail;