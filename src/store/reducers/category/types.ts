import { IBrand, IProduct, ICategory } from '../../../models';
import { QueryUrlInterface } from '../../../shared';

export interface ILoadedProducts {
  data: IProduct[] | null;
  totalCount: number;
  currentPage: number;
}

export interface CategoryState {
  isLoading: boolean;
  error: string | null;
  products: ILoadedProducts;
  brands: IBrand[] | null;
  queryUrl: QueryUrlInterface;
  categories: ICategory[] | null;
}

export enum CategoryActionEnum {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_FILTER_QUERY = 'SET_FILTER_QUERY',
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_BRANDS = 'SET_BRANDS',
  SET_CATEGORY = 'SET_CATEGORY',
}

export interface SetIsLoadingAction {
  type: CategoryActionEnum.SET_LOADING;
}

export interface SetErrorAction {
  type: CategoryActionEnum.SET_ERROR;
  payload: string;
}

export interface SetProductsAction {
  type: CategoryActionEnum.SET_PRODUCTS;
  payload: ILoadedProducts;
}

export interface SetFilterQueryAction {
  type: CategoryActionEnum.SET_FILTER_QUERY;
  payload: QueryUrlInterface;
}

export interface SetBrandsAction {
  type: CategoryActionEnum.SET_BRANDS;
  payload: IBrand[];
}

export interface SetCategoryAction {
  type: CategoryActionEnum.SET_CATEGORY;
  payload: ICategory[];
}

export type CategoryAction =
  | SetIsLoadingAction
  | SetErrorAction
  | SetFilterQueryAction
  | SetProductsAction
  | SetBrandsAction
  | SetCategoryAction;
