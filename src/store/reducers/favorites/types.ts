import { IProduct } from '../../../models';

export type ILoadedProducts = IProduct[] | [];

export interface FavoritesState {
  isLoading: boolean;
  error: string | null;
  favoritesIdList: string[];
  favoritesProducts: IProduct[];
}

export enum FavoritesActionEnum {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_TO_FAVORITES = 'SET_TO_FAVORITES',
  REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES',
  SET_FAVORITES_PRODUCTS = 'SET_FAVORITES_PRODUCTS',
}

export interface SetIsLoadingAction {
  type: FavoritesActionEnum.SET_LOADING;
}

export interface SetErrorAction {
  type: FavoritesActionEnum.SET_ERROR;
  payload: string;
}

export interface SetFavoritesProductsAction {
  type: FavoritesActionEnum.SET_FAVORITES_PRODUCTS;
  payload: ILoadedProducts;
}

export interface SetToFavoritesAction {
  type: FavoritesActionEnum.SET_TO_FAVORITES;
  payload: string;
}

export interface RemoveFromFavoritesAction {
  type: FavoritesActionEnum.REMOVE_FROM_FAVORITES;
  payload: string;
}

export type FavoritesAction =
  | SetIsLoadingAction
  | SetErrorAction
  | SetToFavoritesAction
  | RemoveFromFavoritesAction
  | SetFavoritesProductsAction;
