import React, { useEffect, createContext, useContext } from 'react';
import qs from 'qs';
import * as spotify from '../spotify-config';
import { useRememberedState } from '../hooks/useRememberedState';
import { RememberedStates } from '../types/RememberedStates';

const link =
  `${spotify.authEndpoint}?` +
  qs.stringify({
    client_id: spotify.clientId,
    redirect_uri: spotify.redirectUri,
    scope: spotify.scopes.join(' '),
    response_type: 'token',
    show_dialog: true,
  });

type Auth = {
  access_token: string;
  expires_in: string;
  token_type: string;
};

const SpotifyContext = createContext<Auth>({} as Auth);

export const useSpotifyAuth = () => useContext(SpotifyContext);

export const SpotifyLoginGate: React.FC = ({ children }) => {
  const [auth, setAuth] = useRememberedState<Auth | null>(
    RememberedStates.SPOTIFY_AUTH,
    null,
  );

  useEffect(() => {
    const queryString = window.location.hash.slice(1);

    if (queryString) {
      const data = qs.parse(queryString) as Auth;

      setAuth(data);

      // remove the # part of the URL
      window.history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search,
      );
    }
  }, [setAuth]);

  return auth ? (
    <SpotifyContext.Provider value={auth}>{children}</SpotifyContext.Provider>
  ) : (
    <a href={link}>Login to Spotify</a>
  );
};
