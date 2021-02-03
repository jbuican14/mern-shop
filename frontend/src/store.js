import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  productDetailsReducer,
  productListReducer,
} from './reducers/product.reducer';

import { cartReducer } from './reducers/cart.reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const localstorageItem = localStorage.getItem('cartItem');
const cartItemsFromStorage = localstorageItem
  ? JSON.parse(localstorageItem)
  : [];

const initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
