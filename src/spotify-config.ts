export const authEndpoint = 'https://accounts.spotify.com/authorize';

export const baseUrl = 'https://api.spotify.com/v1';

export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const scopes = [
  'user-read-recently-played',
  'user-top-read',
  'user-library-read',
];
