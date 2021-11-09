import { CategoryAction, CategoryActionEnum, CategoryState } from './types';

const initialState: CategoryState = {
  isLoading: false,
  error: null,
  products: {
    data: null,
    totalCount: 0,
    currentPage: 1,
  },
  queryUrl: {
    _limit: 10,
    _page: 1,
    price_gte: 0,
    price_lte: 85000,
    rating_gte: 0,
    rating_lte: 5,
    brand: [],
    category: [],
    q: null,
  },
  brands: null,
  categories: null,
};

export default function CategoryReducer(
  state = initialState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case CategoryActionEnum.SET_LOADING: {
      return { ...state, isLoading: true, error: null };
    }

    case CategoryActionEnum.SET_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case CategoryActionEnum.SET_FILTER_QUERY: {
      return { ...state, isLoading: false, queryUrl: action.payload };
    }

    case CategoryActionEnum.SET_PRODUCTS: {
      return { ...state, isLoading: false, products: action.payload };
    }

    case CategoryActionEnum.SET_BRANDS: {
      return { ...state, brands: action.payload, isLoading: false };
    }

    case CategoryActionEnum.SET_CATEGORY: {
      return { ...state, categories: action.payload, isLoading: false };
    }

    default:
      return state;
  }
}
