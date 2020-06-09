import { useApi } from '../../components/ApiProvider';
import { useEffect, useState, useCallback, useRef } from 'react';
import axios, { AxiosRequestConfig, CancelToken } from 'axios';

type Options = {
  queryParams: object;
};

export const useGet = <T>(uri: string, shouldInitialFetch: boolean = !!uri) => {
  const { api } = useApi();
  const [response, setResponse] = useState<T | null>(null);

  const fetch = useCallback(
    (cancelToken: CancelToken) => {
      return api
        .get<T>(uri, { cancelToken })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setResponse(res.data);
          }
        });
    },
    [api, uri],
  );

  const hasFetched = useRef(false);
  const lastUri = useRef<string | null>(null);
  useEffect(() => {
    const source = axios.CancelToken.source();

    if (
      (lastUri.current && lastUri.current !== uri) ||
      (!hasFetched.current && shouldInitialFetch)
    ) {
      fetch(source.token).then(() => {
        lastUri.current = uri;
        hasFetched.current = true;
      });
    } else {
      lastUri.current = uri;
    }

    return () => {
      source.cancel();
    };
  }, [uri, fetch, shouldInitialFetch]);

  return response;
};
