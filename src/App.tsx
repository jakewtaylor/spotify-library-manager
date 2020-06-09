import React from 'react';
import { SpotifyLoginGate } from './components/SpotifyLoginGate';
import { SpotifyApi } from './components/SpotifyApi';
import { Search } from './components/Search';

export const App: React.FC = () => {
  return (
    <SpotifyLoginGate>
      <SpotifyApi>
        <Search />
      </SpotifyApi>
    </SpotifyLoginGate>
  );
};
