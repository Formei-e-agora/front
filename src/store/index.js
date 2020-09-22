import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';

// const persistConfig = {
//     key: 'root',
//     storage
// }

// persistConfig with blacklist example
// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist: ['navigation'] // navigation will not be persisted
// };

// persistConfig with whitelist example
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'] // only user will be persisted
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
