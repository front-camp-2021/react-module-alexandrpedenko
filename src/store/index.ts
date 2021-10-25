import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

const rootReducer = combineReducers(reducers);

export const store = createStore(
  rootReducer,
  load({
    states: ['category', 'favorites', 'cart'],
    disableWarnings: true,
  }),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      save({
        states: ['category', 'favorites', 'cart'],
      })
    )
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
