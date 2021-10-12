import { useEffect, useState, useRef } from 'react';
import { useActions } from '../hooks';
import { IBrand, ICategory } from '../models';
import {
  BrandCheckboxesState,
  CategoryCheckboxesState,
  SidebarFilterInterface,
} from '../shared/types';
import { prepareFilters } from '../shared/utils';
import { useTypedSelector } from './useTypedSelector';

interface useSidebarFilterProps {
  brands: IBrand[] | null;
  categories: ICategory[] | null;
}

export const useSidebarFilter = ({
  brands,
  categories,
}: useSidebarFilterProps) => {
  const { products, queryUrl } = useTypedSelector((state) => state.category);
  const { filterProduct, loadBrands, loadCategories, loadProducts } =
    useActions();

  const [brandCheckboxes, setBrandCheckboxes] = useState<BrandCheckboxesState>(
    queryUrl.brand || []
  );
  const [categoryCheckboxes, setCategoryCheckboxes] =
    useState<CategoryCheckboxesState>(queryUrl.category || []);
  const [ratingRangeState, setRatingRangeState] = useState({
    min: queryUrl.rating_gte || 0,
    max: queryUrl.rating_lte || 5,
  });
  const [princeRangeState, setPriceRangeState] = useState({
    min: queryUrl.price_gte || 0,
    max: queryUrl.price_lte || 85000,
  });
  const [resetFormState, setResetFormState] = useState(false);
  const firstLoad = useRef(true);

  let preparedBrandFilters;
  let preparedCategoryFilters;

  useEffect(() => {
    if (!products.data) {
      loadProducts();
    }

    loadBrands();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstLoad.current) {
      setResetFormState(false);

      filterProduct({
        brand: brandCheckboxes,
        category: categoryCheckboxes,
        price: princeRangeState,
        rating: ratingRangeState,
      } as SidebarFilterInterface);
    }

    firstLoad.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandCheckboxes, categoryCheckboxes, princeRangeState, ratingRangeState]);

  if (brands) {
    preparedBrandFilters = prepareFilters(brands);
  }

  if (categories) {
    preparedCategoryFilters = prepareFilters(categories);
  }

  const setBrandCheckboxesToState = (value: string) => {
    setBrandCheckboxes((prevState) => [...prevState, value]);
  };

  const removeBrandCheckboxesFromState = (value: string) => {
    setBrandCheckboxes((prevState) =>
      prevState.filter((item) => item !== value)
    );
  };

  const setCategoryCheckboxesToState = (value: string) => {
    setCategoryCheckboxes((prevState) => [...prevState, value]);
  };

  const removeCategoryCheckboxesFromState = (value: string) => {
    setCategoryCheckboxes((prevState) =>
      prevState.filter((item) => item !== value)
    );
  };

  const priceMultiRangeChange = ({ min, max }: typeof princeRangeState) => {
    if (min !== princeRangeState.min || max !== princeRangeState.max) {
      setPriceRangeState((prevState) => ({
        ...prevState,
        min,
        max,
      }));
    }
  };

  const ratingMultiRangeChange = ({ min, max }: typeof ratingRangeState) => {
    if (min !== ratingRangeState.min || max !== ratingRangeState.max) {
      setRatingRangeState((prevState) => ({
        ...prevState,
        min,
        max,
      }));
    }
  };

  const resetFiltersHandler = () => {
    setResetFormState(true);
    setBrandCheckboxes([]);
    setCategoryCheckboxes([]);
    setPriceRangeState((prevState) => ({
      ...prevState,
      min: 0,
      max: 85000,
    }));
    setRatingRangeState((prevState) => ({
      ...prevState,
      min: 0,
      max: 5,
    }));
  };

  return {
    preparedBrandFilters,
    preparedCategoryFilters,
    brandCheckboxes,
    categoryCheckboxes,
    ratingRangeState,
    princeRangeState,
    resetFormState,
    setBrandCheckboxesToState,
    removeBrandCheckboxesFromState,
    setCategoryCheckboxesToState,
    removeCategoryCheckboxesFromState,
    priceMultiRangeChange,
    ratingMultiRangeChange,
    resetFiltersHandler,
  };
};
