/**
 * Authorization module for Spotify
 */

 import Axios, { AxiosResponse } from "axios";
 
 // Spotify Auth
 const tokenURL = "https://accounts.spotify.com/api/token";
 
 export type SpotifyToken = {
   access_token: string;
   token_type: string;
   expires_in: number;
 };
 
 /**
  * Request a new access token to the Spotify Web API
  */
 export const requestAccessToken = async (): Promise<SpotifyToken> => {
   const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
   const bearer = Buffer.from(`${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`, "utf-8").toString("base64");
 
   // Add stringified params
   const params = new URLSearchParams();
   params.append("grant_type", "client_credentials");
 
   return await Axios.post(tokenURL, params, {
     headers: {
       Authorization: `Basic ${bearer}`,
       "Content-Type": "application/x-www-form-urlencoded"
     }
   })
     .then((response: AxiosResponse) => {
       const { data: token, status } = response;
      console.log(response)
       if (status === 200) {
         return token;
       } else {
         throw new Error("Authentication error");
       }
     })
     .catch((err: any) => {
       throw err;
     });
 };
 