import { configureStore, ThunkAction, Action, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga"

import sagas from './sagas'
import reducer from './reducers'


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middelwareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middelwareEnhancer];

export const store = configureStore({
  devTools: true,
  reducer,
  enhancers
});

sagaMiddleware.run(sagas)

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
