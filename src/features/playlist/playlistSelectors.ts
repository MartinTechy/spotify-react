import { RootState } from '../../app/store';
import { SpotifyPlaylist } from './playlistTypes';

export const getPlaylistsSelector = () => (state: RootState):SpotifyPlaylist[] => state.playlists.playlists;

export const getCurrentPlaylistIDSelector = () => (state: RootState):string => state.playlists.currentPlaylistID;

export const getCurrentPlaylistSelector = () => (state: RootState) => {
	const { currentPlaylistID, playlists } = state.playlists;

	return playlists.find(playlist => playlist.id === currentPlaylistID);
};