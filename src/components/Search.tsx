import React, { useState } from 'react';
import { useSearch } from '../hooks/spotify/useSearch';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('kyuss');
  const { albums, artists, tracks } = useSearch(query);

  console.log({ albums, artists, tracks });

  return (
    <div className="p-8">
      <input value={query} onChange={(e) => setQuery(e.target.value)} />

      {artists && artists.items.length > 0 ? (
        <>
          <h5 className="text-gray-300 text-md">Artists</h5>
          <ul>
            {artists.items.map((artist) => (
              <li key={artist.id} className="text-gray-100 text-lg">
                {artist.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {albums && albums.items.length > 0 ? (
        <>
          <h5 className="text-gray-300 text-md mt-2">Albums</h5>
          <ul>
            {albums.items.map((album) => (
              <li key={album.id} className="text-gray-100 text-lg">
                {album.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {tracks && tracks.items.length > 0 ? (
        <>
          <h5 className="text-gray-300 text-md mt-2">Tracks</h5>
          <ul>
            {tracks.items.map((track) => (
              <li key={track.id} className="text-gray-100 text-lg">
                {track.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
