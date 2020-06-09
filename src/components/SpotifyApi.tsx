import React, { useMemo } from 'react';
import { useSpotifyAuth } from './SpotifyLoginGate';
import { ApiProvider } from './ApiProvider';
import * as spotify from '../spotify-config';

export const SpotifyApi: React.FC = ({ children }) => {
  const auth = useSpotifyAuth();

  const headers = useMemo(
    () => ({
      Authorization: `${auth.token_type} ${auth.access_token}`,
    }),
    [auth.token_type, auth.access_token],
  );

  return (
    <ApiProvider baseURL={spotify.baseUrl} headers={headers}>
      {children}
    </ApiProvider>
  );
};
