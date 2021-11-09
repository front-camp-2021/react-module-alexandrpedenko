import { CategoryService } from '../../../services';
import { AppDispatch, RootState } from '../../index';
import { IBrand, ICategory } from '../../../models';
import {
  CategoryActionEnum,
  SetErrorAction,
  SetIsLoadingAction,
  SetProductsAction,
  SetFilterQueryAction,
  SetCategoryAction,
  SetBrandsAction,
  ILoadedProducts,
} from './types';
import { SidebarFilterInterface, QueryUrlInterface } from '../../../shared';

const categoryService = new CategoryService();

export const CategoryActionCreators = {
  setError: (error: string): SetErrorAction => ({
    type: CategoryActionEnum.SET_ERROR,
    payload: error,
  }),

  setIsLoading: (): SetIsLoadingAction => ({
    type: CategoryActionEnum.SET_LOADING,
  }),

  setFilterQueryObject: (
    filterQueryObject: QueryUrlInterface
  ): SetFilterQueryAction => ({
    type: CategoryActionEnum.SET_FILTER_QUERY,
    payload: filterQueryObject,
  }),

  setProductsAction: ({
    data,
    totalCount,
    currentPage,
  }: ILoadedProducts): SetProductsAction => ({
    type: CategoryActionEnum.SET_PRODUCTS,
    payload: { data, totalCount, currentPage },
  }),

  setCategoryAction: (category: ICategory[]): SetCategoryAction => ({
    type: CategoryActionEnum.SET_CATEGORY,
    payload: category,
  }),

  setBrandsAction: (brands: IBrand[]): SetBrandsAction => ({
    type: CategoryActionEnum.SET_BRANDS,
    payload: brands,
  }),

  loadProducts: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(CategoryActionCreators.setIsLoading());

      const response = await categoryService.getProducts();
      const totalCount = response.headers['x-total-count'] as number;
      const data = response.data;

      dispatch(
        CategoryActionCreators.setProductsAction({
          data,
          totalCount,
          currentPage: 1,
        })
      );
    } catch (error) {
      dispatch(
        CategoryActionCreators.setError(
          `Error occurred when products are loading: ${error}`
        )
      );
    }
  },

  paginateProducts:
    (page: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const { queryUrl } = getState().category;
        categoryService.setQueryUrl(queryUrl);

        dispatch(CategoryActionCreators.setIsLoading());

        const response = await categoryService.getProducts(page);
        const totalCount = response.headers['x-total-count'];
        const data = response.data;

        dispatch(
          CategoryActionCreators.setProductsAction({
            data,
            totalCount,
            currentPage: page,
          })
        );
      } catch (error) {
        dispatch(
          CategoryActionCreators.setError(
            `Error occurred when products are loading: ${error}`
          )
        );
      }
    },

  searchProducts:
    (searchQuery: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const { queryUrl } = getState().category;
        categoryService.setQueryUrl(queryUrl);
        dispatch(CategoryActionCreators.setIsLoading());

        const response = await categoryService.getSearchedProducts(searchQuery);
        const totalCount = response.headers['x-total-count'];
        const data = response.data;

        dispatch(
          CategoryActionCreators.setProductsAction({
            data,
            totalCount,
            currentPage: 1,
          })
        );

        const savedQueryUrl = categoryService.getSavedQueryUrl();
        dispatch(CategoryActionCreators.setFilterQueryObject(savedQueryUrl));
      } catch (error) {
        dispatch(
          CategoryActionCreators.setError(
            `Error occurred when products are loading: ${error}`
          )
        );
      }
    },

  filterProduct:
    (filters: SidebarFilterInterface) => async (dispatch: AppDispatch) => {
      try {
        dispatch(CategoryActionCreators.setIsLoading());

        const response = await categoryService.getFilteredProducts(filters);
        const totalCount = response.headers['x-total-count'];
        const data = response.data;

        dispatch(
          CategoryActionCreators.setProductsAction({
            data,
            totalCount,
            currentPage: 1,
          })
        );
        const queryUrl = categoryService.getSavedQueryUrl();

        dispatch(CategoryActionCreators.setFilterQueryObject(queryUrl));
      } catch (error) {
        dispatch(
          CategoryActionCreators.setError(
            `Error occurred when brands are loading: ${error}`
          )
        );
      }
    },

  loadBrands: () => async (dispatch: AppDispatch) => {
    try {
      const response = await categoryService.getBrands();

      dispatch(CategoryActionCreators.setBrandsAction(response.data));
    } catch (error) {
      dispatch(
        CategoryActionCreators.setError(
          `Error occurred when brands are loading: ${error}`
        )
      );
    }
  },

  loadCategories: () => async (dispatch: AppDispatch) => {
    try {
      const response = await categoryService.getCategories();

      dispatch(CategoryActionCreators.setCategoryAction(response.data));
    } catch (error) {
      dispatch(
        CategoryActionCreators.setError(
          `Error occurred when brands are loading: ${error}`
        )
      );
    }
  },
};
