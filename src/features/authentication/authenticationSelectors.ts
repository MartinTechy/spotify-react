import { RootState } from '../../app/store';

export const getAccessTokenSelector = () => (state:RootState) => state.authentication.accessToken;

export const getUserIDSelector = () => (state: RootState) => state.authentication.userID;

export const getIsAuthenticated = () => (state: RootState) => state.authentication.accessToken !== undefined;