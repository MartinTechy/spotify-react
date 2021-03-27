import { RootState } from '../../app/store';
import { Track } from './trackTypes';


export const getTracksSelector = () => (state: RootState): Track[] => state.tracks.tracks;