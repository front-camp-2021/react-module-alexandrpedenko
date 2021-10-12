import { IBrand } from './IBrand';
import { ICategory } from './ICategory';

export interface IProduct {
  id: string;
  images: string[];
  title: string;
  rating: number;
  price: number;
  category: ICategory;
  brand: IBrand;
}
