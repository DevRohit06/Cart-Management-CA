import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

function createPersistedStore(key: string, startValue: null) {
  const storedValue = Cookies.get(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : startValue;
  const store = writable(initialValue);

  store.subscribe((value) => {
    Cookies.set(key, JSON.stringify(value));
  });

  return store;
}

export const userStore = createPersistedStore('user', null);