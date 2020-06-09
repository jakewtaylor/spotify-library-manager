import { useEffect, useState, useRef } from 'react';

const serialize = <T>(obj: T): string => JSON.stringify(obj);
const deserialze = <T>(str: string): T => JSON.parse(str);

const loadState = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);

  return stored ? deserialze(stored) : initial;
};

const saveState = <T>(key: string, value: T) =>
  localStorage.setItem(key, serialize(value));

export const useRememberedState = <T>(
  name: string,
  initial: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const key = useRef(name);

  const [state, setState] = useState<T>(() => loadState(key.current, initial));

  useEffect(() => {
    saveState(key.current, state);
  }, [state]);

  return [state, setState];
};
