import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../types/requests';
import { ErrorPayload } from '../../types/store';
import { ACCOUNT_BASE_URL, PATHS } from '../../utils/axios';

const SCOPE = 'playlist-read-private playlist-modify-private playlist-modify-public playlist-modify-public playlist-modify-private';
const RESPONSE_TYPE ='token';
const REDIRECT_URI = 'http://localhost:3000';

export interface AuthenticationReducerState {
    accessToken?: string;
	userID?: string;
	status: RequestStatus;
	error?: string;
}

export interface SetAccessTokenPayload {
    accessToken: string;
}

export interface FetchUserIDSuccessPayload {
	userID: string;
}

const initialState:AuthenticationReducerState = {
	status: RequestStatus.IDLE
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login() {
			window.location.href = `${ACCOUNT_BASE_URL}${PATHS.AUTHORIZE}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
		},
		setAccessToken(state, action:PayloadAction<SetAccessTokenPayload>) {
			state.accessToken = action.payload.accessToken;
			window.location.href = '';
		},
		fetchUserID(state) {
			state.status = RequestStatus.PENDING;
		},
		fetchUserIDSuccess(state, action: PayloadAction<FetchUserIDSuccessPayload>) {
			state.status = RequestStatus.SUCCESS;
			state.userID = action.payload.userID;
		},
		fetchUserIDError(state, action: PayloadAction<ErrorPayload>) {
			state.status = RequestStatus.ERROR;
			state.error = action.payload.message;
		}
	}
});

export const { login, setAccessToken, fetchUserID, fetchUserIDSuccess, fetchUserIDError } = authenticationSlice.actions;
export default authenticationSlice.reducer;