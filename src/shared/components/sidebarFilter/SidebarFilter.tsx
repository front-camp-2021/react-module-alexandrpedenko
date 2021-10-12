import { FC } from 'react';
import { useSidebarFilter } from '../../../hooks';
import { IBrand, ICategory } from '../../../models';
import { FilterCheckboxes, MultiRangeSlider } from '../index';
import { Button } from '../index';
import './sidebarFilter.scss';

interface SidebarProps {
  brands: IBrand[] | null;
  categories: ICategory[] | null;
}

export const SidebarFilter: FC<SidebarProps> = ({ brands, categories }) => {
  const {
    brandCheckboxes,
    categoryCheckboxes,
    princeRangeState,
    ratingRangeState,
    preparedBrandFilters,
    preparedCategoryFilters,
    resetFormState,
    setBrandCheckboxesToState,
    removeBrandCheckboxesFromState,
    setCategoryCheckboxesToState,
    removeCategoryCheckboxesFromState,
    priceMultiRangeChange,
    ratingMultiRangeChange,
    resetFiltersHandler,
  } = useSidebarFilter({ brands, categories });

  return (
    <div className='filter'>
      <div className='filter__header'>
        <h3 className='filter__header-title'>Filters</h3>
        <Button icon='ChevronsRight' color='white' size='icon'></Button>
      </div>
      <div className='filter__body'>
        <MultiRangeSlider
          title='Price'
          min={0}
          max={85000}
          step={5}
          currentRangeSliderState={princeRangeState}
          resetFormState={resetFormState}
          onChange={priceMultiRangeChange}
        />
        <MultiRangeSlider
          title='Rating'
          min={0}
          max={5}
          currentRangeSliderState={ratingRangeState}
          resetFormState={resetFormState}
          onChange={ratingMultiRangeChange}
        />
        {preparedBrandFilters && (
          <FilterCheckboxes
            title='Brand'
            resetFormState={resetFormState}
            checkedItems={brandCheckboxes}
            filterItems={preparedBrandFilters}
            setCheckboxToState={setBrandCheckboxesToState}
            removeCheckboxFromState={removeBrandCheckboxesFromState}
          />
        )}
        {preparedCategoryFilters && (
          <FilterCheckboxes
            title='Category'
            resetFormState={resetFormState}
            checkedItems={categoryCheckboxes}
            filterItems={preparedCategoryFilters}
            setCheckboxToState={setCategoryCheckboxesToState}
            removeCheckboxFromState={removeCategoryCheckboxesFromState}
          />
        )}
      </div>
      <Button
        className='filter__clearButton'
        text='Clear all filters'
        color='primary'
        size='medium'
        onClick={resetFiltersHandler}
      />
    </div>
  );
};
