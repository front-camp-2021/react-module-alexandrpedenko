import axios, { AxiosResponse } from 'axios';
import { stringify } from 'query-string';
import { IProduct } from '../models';

interface QueryCartUrlInterface {
  id: string[] | string | null;
}

export class CartService {
  backendUrl?: string;
  queryUrl: QueryCartUrlInterface;

  constructor() {
    this.queryUrl = {
      id: null,
    };

    this.backendUrl = process.env.REACT_APP_BACKEND_URL;
  }

  async loadCartSingleProduct(
    productId: string
  ): Promise<AxiosResponse<IProduct[]>> {
    this.queryUrl = {
      ...this.queryUrl,
      id: productId,
    };

    return axios.get<IProduct[]>(
      `${this.backendUrl}/products?${this.stringifyQueryUrl()}`
    );
  }

  async loadCartProducts(
    cartIdList: string[]
  ): Promise<AxiosResponse<IProduct[]>> {
    this.queryUrl = {
      ...this.queryUrl,
      id: cartIdList.length > 1 ? cartIdList : null,
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
