import { IBrand, ICategory } from '../../models';

export interface PreparedFiltersInterface {
  value: string;
  title: string;
}

export interface QueryUrlInterface {
  _limit: number | null;
  _page: number | null;
  price_gte: number | null;
  price_lte: number | null;
  rating_gte: number | null;
  rating_lte: number | null;
  brand: [] | string[];
  category: [] | string[];
  q: string | null;
}

export type BrandCheckboxesState = IBrand[];

export type CategoryCheckboxesState = ICategory[];

export interface SidebarFilterInterface {
  brand: IBrand[];
  category: ICategory[];
  price: { min: number; max: number };
  rating: { min: number; max: number };
}
