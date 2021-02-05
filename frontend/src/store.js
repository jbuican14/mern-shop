import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  productDetailsReducer,
  productListReducer,
} from './reducers/product.reducer';

import { cartReducer } from './reducers/cart.reducer';
import { userLoginReducer } from './reducers/user.reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const localstorageItem = localStorage.getItem('cartItems');
const cartItemsFromStorage = localstorageItem
  ? JSON.parse(localstorageItem)
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
