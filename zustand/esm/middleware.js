var __defProp = Object.defineProperty;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const redux = (reducer, initial) => (set, get, api) => {
  api.dispatch = (action) => {
    set((state) => reducer(state, action));
    if (api.devtools) {
      api.devtools.send(api.devtools.prefix + action.type, get());
    }
    return action;
  };
  return __objSpread({dispatch: api.dispatch}, initial);
};
const devtools = (fn, prefix) => (set, get, api) => {
  let extension;
  try {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!extension) {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      console.warn("Please install/enable Redux devtools extension");
    }
    api.devtools = null;
    return fn(set, get, api);
  }
  const namedSet = (state, replace, name) => {
    set(state, replace);
    if (!api.dispatch) {
      api.devtools.send(api.devtools.prefix + (name || "action"), get());
    }
  };
  const initialState = fn(namedSet, get, api);
  if (!api.devtools) {
    const savedSetState = api.setState;
    api.setState = (state, replace) => {
      savedSetState(state, replace);
      api.devtools.send(api.devtools.prefix + "setState", api.getState());
    };
    api.devtools = extension.connect({name: prefix});
    api.devtools.prefix = prefix ? `${prefix} > ` : "";
    api.devtools.subscribe((message) => {
      var _a;
      if (message.type === "DISPATCH" && message.state) {
        const ignoreState = message.payload.type === "JUMP_TO_ACTION" || message.payload.type === "JUMP_TO_STATE";
        if (!api.dispatch && !ignoreState) {
          api.setState(JSON.parse(message.state));
        } else {
          savedSetState(JSON.parse(message.state));
        }
      } else if (message.type === "DISPATCH" && ((_a = message.payload) == null ? void 0 : _a.type) === "COMMIT") {
        api.devtools.init(api.getState());
      }
    });
    api.devtools.init(initialState);
  }
  return initialState;
};
const combine = (initialState, create) => (set, get, api) => Object.assign({}, initialState, create(set, get, api));
const persist = (config, options) => (set, get, api) => {
  const {
    name,
    getStorage = () => localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    blacklist,
    whitelist,
    onRehydrateStorage,
    version = 0,
    migrate
  } = options || {};
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
  }
  if (!storage) {
    return config((...args) => {
      console.warn(`Persist middleware: unable to update ${name}, the given storage is currently unavailable.`);
      set(...args);
    }, get, api);
  }
  const setItem = async () => {
    const state = __objSpread({}, get());
    if (whitelist) {
      Object.keys(state).forEach((key) => {
        !whitelist.includes(key) && delete state[key];
      });
    }
    if (blacklist) {
      blacklist.forEach((key) => delete state[key]);
    }
    return storage == null ? void 0 : storage.setItem(name, await serialize({state, version}));
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  (async () => {
    const postRehydrationCallback = (onRehydrateStorage == null ? void 0 : onRehydrateStorage(get())) || void 0;
    try {
      const storageValue = await storage.getItem(name);
      if (storageValue) {
        const deserializedStorageValue = await deserialize(storageValue);
        if (deserializedStorageValue.version !== version) {
          const migratedState = await (migrate == null ? void 0 : migrate(deserializedStorageValue.state, deserializedStorageValue.version));
          if (migratedState) {
            set(migratedState);
            await setItem();
          }
        } else {
          set(deserializedStorageValue.state);
        }
      }
    } catch (e) {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
      return;
    }
    postRehydrationCallback == null ? void 0 : postRehydrationCallback(get(), void 0);
  })();
  return config((...args) => {
    set(...args);
    void setItem();
  }, get, api);
};

export { combine, devtools, persist, redux };
