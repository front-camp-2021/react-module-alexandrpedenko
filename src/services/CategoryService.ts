import { stringify } from 'query-string';
import axios, { AxiosResponse } from 'axios';
import { ICategory, IProduct, IBrand } from '../models';
import { QueryUrlInterface, SidebarFilterInterface } from '../shared';

export class CategoryService {
  queryUrl: QueryUrlInterface;
  backendUrl?: string;

  constructor() {
    this.queryUrl = {
      _limit: 10,
      _page: 1,
      brand: [],
      category: [],
      price_gte: null,
      price_lte: null,
      rating_gte: null,
      rating_lte: null,
      q: '',
    };
    this.backendUrl = process.env.REACT_APP_BACKEND_URL;
  }

  getSavedQueryUrl() {
    return this.queryUrl;
  }

  setQueryUrl(queryUrl: QueryUrlInterface) {
    this.queryUrl = queryUrl;
  }

  async getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return axios.get<ICategory[]>(`${this.backendUrl}/categories`);
  }

  async getBrands(): Promise<AxiosResponse<IBrand[]>> {
    return axios.get<IBrand[]>(`${this.backendUrl}/brands`);
  }

  async getProducts(page: number = 1): Promise<AxiosResponse<IProduct[]>> {
    this.queryUrl = {
      ...this.queryUrl,
      _page: page,
    };

    return axios.get<IProduct[]>(
      `${this.backendUrl}/products?${this.stringifyQueryUrl()}`
    );
  }

  async getSearchedProducts(
    searchQuery: string
  ): Promise<AxiosResponse<IProduct[]>> {
    this.queryUrl = {
      ...this.queryUrl,
      _page: 1,
      q: searchQuery,
    };

    return axios.get<IProduct[]>(
      `${this.backendUrl}/products?${this.stringifyQueryUrl()}`
    );
  }

  async getFilteredProducts(
    filters: SidebarFilterInterface
  ): Promise<AxiosResponse<IProduct[]>> {
    this.queryUrl = {
      ...this.queryUrl,
      _page: 1,
      brand: filters.brand,
      category: filters.category,
      price_gte: filters.price.min,
      price_lte: filters.price.max,
      rating_gte: filters.rating.min,
      rating_lte: filters.rating.max,
    };

    return await axios.get<IProduct[]>(
      `${this.backendUrl}/products?${this.stringifyQueryUrl()}`
    );
  }

  private stringifyQueryUrl() {
    return stringify(this.queryUrl, {
      skipNull: true,
    });
  }
}
