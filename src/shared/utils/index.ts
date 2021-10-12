import { IBrand, ICategory } from '../../models';
import { CartProductInterface } from '../../store/reducers/cart/types';
import { preparedFiltersInterface } from '../types';

export const prepareFilters = (
  arr: IBrand[] | ICategory[]
): preparedFiltersInterface[] => {
  return arr.map((item) => {
    return {
      value: item.toLowerCase().split(' ').join('_'),
      title: item,
    };
  });
};

export const range = (start: number, end: number) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const calcTotalPrice = (cartProducts: CartProductInterface[]) => {
  return cartProducts.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.product.price * currentValue.productCount;
  }, 0);
};
