const STORE_KEY = "lbdb-filter";

let store = {};

const _uniqArray = (array) => {
  const uniqued = [];
  for (const x of array) {
    if (uniqued.indexOf(x) < 0) {
      uniqued.push(x);
    }
  }
  return uniqued;
};

const _validateStore = () =>
  typeof store === "object" &&
  typeof store.query === "string" &&
  Array.isArray(store.queryHistory) &&
  store.queryHistory.every((x) => typeof x === "string") &&
  typeof store.maxQueryHistory === "number" &&
  typeof store.regexFlg === "boolean";

const _initStore = () => {
  try {
    store = JSON.parse(localStorage.getItem(STORE_KEY));
    if (!_validateStore()) throw "invalid store";
    store.queryHistory = _uniqArray(store.queryHistory.filter((x) => x));
  } catch {
    store = {
      query: "",
      queryHistory: [],
      maxQueryHistory: 10,
      regexFlg: true,
    };
  }
};

const _saveStore = () => localStorage.setItem(STORE_KEY, JSON.stringify(store));

const setQuery = (newQuery) => {
  store.query = newQuery;
  _saveStore();
};

const addQueryHistory = (newQueryHistory) => {
  if (store.queryHistory.includes(newQueryHistory)) return;

  store.queryHistory = [newQueryHistory, ...store.queryHistory].slice(
    0,
    store.maxQueryHistory
  );
  _saveStore();
};

const setRegexFlg = (newRegexFlg) => {
  store.regexFlg = newRegexFlg;
  _saveStore();
};

export const useStore = () => {
  _initStore();
  return { store, setQuery, addQueryHistory, setRegexFlg };
};
