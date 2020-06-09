import qs from 'qs';
import { useGet } from '../api/useGet';
import { useDebounced } from '../useDebounced';

type SearchResponse = SpotifyApi.AlbumSearchResponse &
  SpotifyApi.ArtistSearchResponse &
  SpotifyApi.TrackSearchResponse;

const types = ['album', 'artist', 'track'];

export const useSearch = (query: string) => {
  const debouncedQuery = useDebounced(query, 1500);

  const res = useGet<SearchResponse>(
    '/search?' +
      qs.stringify({
        q: debouncedQuery,
        type: types.join(','),
      }),
    !!debouncedQuery,
  );

  return {
    albums: res?.albums ?? null,
    artists: res?.artists ?? null,
    tracks: res?.tracks ?? null,
  };
};
