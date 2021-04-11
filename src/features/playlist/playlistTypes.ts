import { RequestStatus } from '../../types/requests';

export type SpotifyPlaylist = {
    colaborative: boolean;
    description: string;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: PublicUser;
    public: boolean;
    snapshot_id: string;
    tracks: PlayListTracksRef
    type: string;
    uri: string;
}

export type PublicUser = {
    displayName: string;
    external_urls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: SpotifyImage[];
    type: string;
    uri: string;
}

export type Followers = {
    href: string;
    total: number;
}

export type PlayListTracksRef = {
    href: string;
    total: number;
}

export type SpotifyImage = {
    height: number;
    url: string;
    width: number;
}

export type ExternalUrl = {
    spotify: string;
} 


// Reducer Types

export interface PlaylistReducerState {
    playlists: SpotifyPlaylist[];
    currentPlaylistID: string;
    status: RequestStatus;
    error?: string;
}

export interface FetchPlaylistsSuccessPayload {
    playlists: SpotifyPlaylist[]
}

export interface SetCurrentPlaylistIDPayload {
    id: string;
}

export interface CreatePlaylistPayload {
	name: string;
	description: string;
	isPrivate?: boolean;
}

export interface CreatePlaylistSuccessPayload {
	playlist: SpotifyPlaylist;
}

export interface AddTrackToPlaylistPayload {
	trackURI: string;
}

export interface EditCurrentPlaylistDetailsPayload {
    name: string;
    description: string;
}

export interface EditCurrentPlaylistDetailsSuccessPayload {
    name: string;
    description: string;
}

export interface RemoveTrackFromPlaylistPayload {
    trackURI: string;
    position: number;
}