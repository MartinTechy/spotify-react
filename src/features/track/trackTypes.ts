import { ExternalUrl, SpotifyImage, Followers } from '../playlist/playlistTypes';

export type Track = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalId;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    linked_from: any;
    name: string;
    popularity: number;
    preview_url: string;
    restrictions: Restriction;
    track_number: number;
    type: string;
    uri: string;
}

export type ExternalId = {
    ean: string;
    isrc: string;
    upc: string;
}

export enum Restriction  {
    MARKET = 'market',
    PRODUCT = 'product',
    EXPLICIT = 'explicit'
}

export type Artist = {
    external_urls: ExternalUrl;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export type Album = {
    album_group: string;
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrl;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restriction;
    type: string;
    uri: string;
}