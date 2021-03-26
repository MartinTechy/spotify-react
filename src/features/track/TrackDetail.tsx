import React from 'react';
import { Row } from 'react-bootstrap';
import { Track } from './trackTypes';

type Props = {
    track: Track;
}


function TrackDetail({ track }: Props) {
    const { name, album } = track

    return (<Row>
        {`${name} - ${album.name} - ${album.release_date}`}
    </Row>)
}

export default TrackDetail;