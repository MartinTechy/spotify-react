import { RootState } from "../../app/store";

export const getAccessTokenSelector = () => (state:RootState) => state.authentication.accessToken;
