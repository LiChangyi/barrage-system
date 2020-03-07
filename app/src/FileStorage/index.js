import Store from 'electron-store';

const store = new Store();

export const readFile = (key) => {
  return store.get(key);
};

export const saveFile = (key, data) => {
  store.set(key, data);
};

export default {};
