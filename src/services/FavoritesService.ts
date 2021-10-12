import axios, { AxiosResponse } from 'axios';
import { stringify } from 'query-string';
import { IProduct } from '../models';

interface QueryFavoritesUrlInterface {
  id: string[] | null;
}

export class FavoritesService {
  backendUrl?: string;
  queryUrl: QueryFavoritesUrlInterface;

  constructor() {
    this.queryUrl = {
      id: null,
    };

    this.backendUrl = process.env.REACT_APP_BACKEND_URL;
  }

  async loadFavoritesProducts(
    favoritesIdList: string[]
  ): Promise<AxiosResponse<IProduct[]>> {
    this.queryUrl = {
      ...this.queryUrl,
      id: favoritesIdList ? favoritesIdList : null,
    };

    return axios.get<IProduct[]>(
      `${this.backendUrl}/products?${this.stringifyQueryUrl()}`
    );
  }

  private stringifyQueryUrl() {
    return stringify(this.queryUrl, {
      skipNull: true,
    });
  }
}
