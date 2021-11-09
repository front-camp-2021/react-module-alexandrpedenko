import { AppDispatch } from '../..';
import { FavoritesService } from '../../../services';
import {
  FavoritesActionEnum,
  ILoadedProducts,
  RemoveFromFavoritesAction,
  SetErrorAction,
  SetFavoritesProductsAction,
  SetIsLoadingAction,
  SetToFavoritesAction,
} from './types';

const favoritesService = new FavoritesService();

export const FavoritesActionCreators = {
  setError: (error: string): SetErrorAction => ({
    type: FavoritesActionEnum.SET_FAVORITES_ERROR,
    payload: error,
  }),

  setIsLoading: (): SetIsLoadingAction => ({
    type: FavoritesActionEnum.SET_FAVORITES_LOADING,
  }),

  setFavoritesProductsAction: (
    loadedProducts: ILoadedProducts
  ): SetFavoritesProductsAction => ({
    type: FavoritesActionEnum.SET_FAVORITES_PRODUCTS,
    payload: loadedProducts,
  }),

  setToFavoritesList: (productId: string): SetToFavoritesAction => ({
    type: FavoritesActionEnum.SET_TO_FAVORITES,
    payload: productId,
  }),

  removeFromFavoritesList: (productId: string): RemoveFromFavoritesAction => ({
    type: FavoritesActionEnum.REMOVE_FROM_FAVORITES,
    payload: productId,
  }),

  loadFavoritesProducts:
    (favoritesListId: string[]) => async (dispatch: AppDispatch) => {
      try {
        dispatch(FavoritesActionCreators.setIsLoading());

        const { data } = await favoritesService.loadFavoritesProducts(
          favoritesListId
        );

        dispatch(FavoritesActionCreators.setFavoritesProductsAction(data));
      } catch (error) {
        dispatch(
          FavoritesActionCreators.setError(
            `Error occurred when favorites products are loading: ${error}`
          )
        );
      }
    },
};
