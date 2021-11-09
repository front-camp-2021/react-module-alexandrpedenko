import { AppDispatch, RootState } from '../..';

import { CartService } from '../../../services';
import {
  CartActionEnum,
  SetIsLoadingAction,
  SetErrorAction,
  AddToProductsIdListAction,
  RemoveFromCartAction,
  LoadCartProductAction,
  IncrementProductCountAction,
  DecrementProductCountAction,
  CartProductInterface,
  ChangeProductCountAction,
} from './types';

const cartService = new CartService();

export const CartActionCreators = {
  setError: (error: string): SetErrorAction => ({
    type: CartActionEnum.SET_CART_ERROR,
    payload: error,
  }),

  setIsLoading: (): SetIsLoadingAction => ({
    type: CartActionEnum.SET_CART_LOADING,
  }),

  addToProductsIdListAction: (
    productId: string
  ): AddToProductsIdListAction => ({
    type: CartActionEnum.ADD_ID_TO_CART_LIST,
    payload: productId,
  }),

  addLoadedProductAction: (
    cartProduct: CartProductInterface
  ): LoadCartProductAction => ({
    type: CartActionEnum.LOAD_CART_PRODUCT,
    payload: cartProduct,
  }),

  incrementProductCountAction: (
    productId: string
  ): IncrementProductCountAction => ({
    type: CartActionEnum.INCREMENT_PRODUCT_COUNT,
    payload: productId,
  }),

  decrementProductCountAction: (
    productId: string
  ): DecrementProductCountAction => ({
    type: CartActionEnum.DECREMENT_PRODUCT_COUNT,
    payload: productId,
  }),

  changeProductCountAction: (
    productId: string,
    count: number
  ): ChangeProductCountAction => ({
    type: CartActionEnum.CHANGE_PRODUCT_COUNT,
    payload: { productId, count },
  }),

  deleteCartProduct: (productId: string): RemoveFromCartAction => ({
    type: CartActionEnum.REMOVE_FROM_CART,
    payload: productId,
  }),

  addToCartAction:
    (productId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const { cartProductsIdList } = getState().cart;

        if (cartProductsIdList.includes(productId)) {
          dispatch(CartActionCreators.incrementProductCountAction(productId));
        } else {
          dispatch(CartActionCreators.setIsLoading());
          dispatch(CartActionCreators.addToProductsIdListAction(productId));

          const { data } = await cartService.loadCartSingleProduct(productId);

          const cartProduct = {
            product: data[0],
            productCount: 1,
          } as CartProductInterface;

          dispatch(CartActionCreators.addLoadedProductAction(cartProduct));
        }
      } catch (error) {
        dispatch(
          CartActionCreators.setError(
            `Some error when product added to cart ${error}`
          )
        );
      }
    },
};
