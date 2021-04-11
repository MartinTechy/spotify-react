import { RootState } from '../../app/store';
import { RequestStatus } from '../../types/requests';
import { SpotifyPlaylist } from './playlistTypes';

export const getPlaylistsSelector = () => (state: RootState):SpotifyPlaylist[] => state.playlists.playlists;

export const getCurrentPlaylistIDSelector = () => (state: RootState):string => state.playlists.currentPlaylistID;

export const getCurrentPlaylistSelector = () => (state: RootState) => {
	const { currentPlaylistID, playlists } = state.playlists;

	return playlists.find(playlist => playlist.id === currentPlaylistID);
};

export const getCurrentPlaylistDescriptionSelector = () => (state: RootState) => getCurrentPlaylistSelector()(state)?.description;

export const getCurrentPlaylistNameSelector = () => (state: RootState) => getCurrentPlaylistSelector()(state)?.name;

export const getPlaylistsLoadingSelector = () => (state: RootState) => state.playlists.status === RequestStatus.PENDING;