import { FavoritesAction, FavoritesActionEnum, FavoritesState } from './types';

const initialState: FavoritesState = {
  isFavoritesLoading: false,
  favoritesError: null,
  favoritesIdList: [],
  favoritesProducts: [],
};

export default function CategoryReducer(
  state = initialState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case FavoritesActionEnum.SET_FAVORITES_LOADING: {
      return { ...state, isFavoritesLoading: true, favoritesError: null };
    }

    case FavoritesActionEnum.SET_FAVORITES_ERROR: {
      return {
        ...state,
        isFavoritesLoading: false,
        favoritesError: action.payload,
      };
    }

    case FavoritesActionEnum.SET_TO_FAVORITES: {
      return {
        ...state,
        favoritesIdList: [...state.favoritesIdList, action.payload],
      };
    }

    case FavoritesActionEnum.SET_FAVORITES_PRODUCTS: {
      return {
        ...state,
        isFavoritesLoading: false,
        favoritesProducts: action.payload,
      };
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
