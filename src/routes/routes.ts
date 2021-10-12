import { ComponentType } from 'react';
import { Cart, Category, Favorites } from '../pages';

export interface IRoute {
  path: string;
  component: ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  CART = '/cart',
  CATEGORY = '/category',
  FAVORITES = '/favorites',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.CART,
    component: Cart,
    exact: true,
  },
  {
    path: RouteNames.CATEGORY,
    component: Category,
    exact: true,
  },
  {
    path: RouteNames.FAVORITES,
    component: Favorites,
    exact: true,
  },
];
