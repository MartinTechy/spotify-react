
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
    tracks: PlayListTracksRef[];
    type: string;
    uri: string;
}

type PublicUser = {
    displayName: string;
    external_urls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: SpotifyImage[];
    type: string;
    uri: string;
}

type Followers = {
    href: string;
    total: number;
}

type PlayListTracksRef = {
    href: string;
    total: number;
}

type SpotifyImage = {
    height: number;
    url: string;
    width: number;
}

type ExternalUrl = {
    spotify: string;
} 