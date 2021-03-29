import _axios, { AxiosRequestConfig } from 'axios';
import { AxiosOptions } from '../types/requests';

export const API_BASE_URL = 'https://api.spotify.com/v1';
export const ACCOUNT_BASE_URL = 'https://accounts.spotify.com';

export const PATHS = {
	AUTHORIZE: '/me/authorize',
	CREATE_PLAYLIST: (userID:string) => (`/users/${userID}/playlists`),
	PLAYLISTS: '/me/playlists',
	SEARCH: '/search',
	USER_SELF: '/me'
};


export const axios = ({ accessToken, baseURL }: AxiosOptions) => {
	const options: AxiosRequestConfig = {
		timeout: 5000,
		baseURL: API_BASE_URL,
	};

	if(accessToken) {
		options.headers = {
			'Authorization': `Bearer ${accessToken}`
		};
	}

	if(baseURL) {
		options.baseURL = baseURL;
	}

	return _axios.create(options);
};