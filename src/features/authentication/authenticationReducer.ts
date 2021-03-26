import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCOUNT_BASE_URL, PATHS } from "../../utils/axios";

const SCOPE = 'playlist-read-private'
const RESPONSE_TYPE ='token'
const REDIRECT_URI = "http://localhost:3000"

export interface AuthenticationReducerState {
    accessToken?: string;
}

export interface SetAccessTokenPayload {
    accessToken: string;
}

const initialState:AuthenticationReducerState = {

}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state) {
            window.location.href = `${ACCOUNT_BASE_URL}${PATHS.AUTHORIZE}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`
        },
        setAccessToken(state, action:PayloadAction<SetAccessTokenPayload>) {
            state.accessToken = action.payload.accessToken
            window.location.href = ''
        }
    }
})

export const { login, setAccessToken } = authenticationSlice.actions;
export default authenticationSlice.reducer;