import { FavoritesAction, FavoritesActionEnum, FavoritesState } from './types';

const initialState: FavoritesState = {
  isLoading: false,
  error: null,
  favoritesIdList: [],
  favoritesProducts: [],
};

export default function CategoryReducer(
  state = initialState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case FavoritesActionEnum.SET_LOADING: {
      return { ...state, isLoading: true, error: null };
    }

    case FavoritesActionEnum.SET_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case FavoritesActionEnum.SET_TO_FAVORITES: {
      return {
        ...state,
        favoritesIdList: [...state.favoritesIdList, action.payload],
      };
    }

    case FavoritesActionEnum.SET_FAVORITES_PRODUCTS: {
      return { ...state, isLoading: false, favoritesProducts: action.payload };
    }

    case FavoritesActionEnum.REMOVE_FROM_FAVORITES: {
      return {
        ...state,
        favoritesIdList: [
          ...state.favoritesIdList.filter((item) => item !== action.payload),
        ],
        favoritesProducts: [
          ...state.favoritesProducts.filter(
            (item) => item.id !== action.payload
          ),
        ],
      };
    }

    default:
      return state;
  }
}
