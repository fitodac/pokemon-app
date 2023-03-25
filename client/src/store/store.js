import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // connection to REDUX DEVTOOLS 

export const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(thunkMiddleware))
)
