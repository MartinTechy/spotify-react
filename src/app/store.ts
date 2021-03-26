import { configureStore, ThunkAction, Action, applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage/session'

import sagas from './sagas'
import reducer from './reducers'
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['authentication']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middelwareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middelwareEnhancer];

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  enhancers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

sagaMiddleware.run(sagas)

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
