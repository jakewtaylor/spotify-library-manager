import React, { useMemo, createContext, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

type Context = {
  api: AxiosInstance;
};

const ApiContext = createContext({} as Context);

export const useApi = () => useContext(ApiContext);

type Props = {
  baseURL?: string;
  headers?: { [key: string]: any };
};

export const ApiProvider: React.FC<Props> = ({
  children,
  baseURL,
  headers,
}) => {
  const api = useMemo(() => {
    return axios.create({
      baseURL,
      headers,
    });
  }, [baseURL, headers]);

  const value = useMemo(() => ({ api }), [api]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
