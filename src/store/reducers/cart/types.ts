import { IProduct } from '../../../models';

export type ILoadedProducts = IProduct[] | [];

export interface CartProductInterface {
  product: IProduct;
  productCount: number;
}

export interface CartState {
  isCartLoading: boolean;
  error: string | null;
  cartProductsIdList: string[];
  cartProducts: CartProductInterface[];
}

export enum CartActionEnum {
  SET_CART_LOADING = 'SET_CART_LOADING',
  SET_CART_ERROR = 'SET_CART_ERROR',
  ADD_ID_TO_CART_LIST = 'ADD_ID_TO_CART_LIST',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  LOAD_CART_PRODUCT = 'LOAD_CART_PRODUCT',
  INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT',
  DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT',
  CHANGE_PRODUCT_COUNT = 'CHANGE_PRODUCT_COUNT',
}

export interface SetIsLoadingAction {
  type: CartActionEnum.SET_CART_LOADING;
}

export interface SetErrorAction {
  type: CartActionEnum.SET_CART_ERROR;
  payload: string;
}

export interface LoadCartProductAction {
  type: CartActionEnum.LOAD_CART_PRODUCT;
  payload: CartProductInterface;
}

export interface AddToProductsIdListAction {
  type: CartActionEnum.ADD_ID_TO_CART_LIST;
  payload: string;
}

export interface RemoveFromCartAction {
  type: CartActionEnum.REMOVE_FROM_CART;
  payload: string;
}

export interface ChangeProductCountAction {
  type: CartActionEnum.CHANGE_PRODUCT_COUNT;
  payload: { productId: string; count: number };
}

export interface IncrementProductCountAction {
  type: CartActionEnum.INCREMENT_PRODUCT_COUNT;
  payload: string;
}

export interface DecrementProductCountAction {
  type: CartActionEnum.DECREMENT_PRODUCT_COUNT;
  payload: string;
}

export type CartAction =
  | SetIsLoadingAction
  | SetErrorAction
  | AddToProductsIdListAction
  | LoadCartProductAction
  | RemoveFromCartAction
  | IncrementProductCountAction
  | DecrementProductCountAction
  | ChangeProductCountAction;
