import { CartState, CartAction, CartActionEnum } from './types';

const initialState: CartState = {
  isCartLoading: false,
  error: null,
  cartProductsIdList: [],
  cartProducts: [],
};

export default function CategoryReducer(
  state = initialState,
  action: CartAction
): CartState {
  switch (action.type) {
    case CartActionEnum.SET_CART_LOADING: {
      return { ...state, isCartLoading: true, error: null };
    }

    case CartActionEnum.SET_CART_ERROR: {
      return {
        ...state,
        isCartLoading: false,
        error: action.payload,
      };
    }

    case CartActionEnum.ADD_ID_TO_CART_LIST: {
      return {
        ...state,
        cartProductsIdList: [...state.cartProductsIdList, action.payload],
      };
    }

    case CartActionEnum.LOAD_CART_PRODUCT: {
      return {
        ...state,
        isCartLoading: false,
        cartProducts: [...state.cartProducts, action.payload],
      };
    }

    case CartActionEnum.INCREMENT_PRODUCT_COUNT: {
      return {
        ...state,
        cartProducts: state.cartProducts.map((item) => {
          if (item.product.id === action.payload) {
            return {
              ...item,
              productCount: item.productCount + 1,
            };
          } else {
            return item;
          }
        }),
      };
    }

    case CartActionEnum.CHANGE_PRODUCT_COUNT: {
      return {
        ...state,
        cartProducts: state.cartProducts.map((item) => {
          if (item.product.id === action.payload.productId) {
            return {
              ...item,
              productCount: action.payload.count,
            };
          } else {
            return item;
          }
        }),
      };
    }

    case CartActionEnum.DECREMENT_PRODUCT_COUNT: {
      return {
        ...state,
        cartProducts: state.cartProducts.map((item) => {
          if (item.product.id === action.payload) {
            return {
              ...item,
              productCount: item.productCount - 1,
            };
          } else {
            return item;
          }
        }),
      };
    }

    case CartActionEnum.REMOVE_FROM_CART: {
      return {
        ...state,
        cartProductsIdList: [
          ...state.cartProductsIdList.filter((item) => item !== action.payload),
        ],
        cartProducts: [
          ...state.cartProducts.filter(
            (item) => item.product.id !== action.payload
          ),
        ],
      };
    }

    default:
      return state;
  }
}
