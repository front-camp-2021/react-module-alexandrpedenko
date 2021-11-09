import { ChangeEvent, useEffect, useRef } from 'react';
import { CheckboxInput } from '..';
import { PreparedFiltersInterface } from '../../types';
import './filterCheckboxes.scss';

export interface FilterCheckboxesProps {
  title: string;
  filterItems: PreparedFiltersInterface[];
  resetFormState: boolean;
  checkedItems: string[];
  setCheckboxToState: (value: string) => void;
  removeCheckboxFromState: (value: string) => void;
}

export const FilterCheckboxes = ({
  title,
  filterItems,
  resetFormState,
  checkedItems,
  setCheckboxToState,
  removeCheckboxFromState,
}: FilterCheckboxesProps) => {
  const onCheckHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckboxToState(event.target.value);
    } else {
      removeCheckboxFromState(event.target.value);
    }
  };
  const checkboxFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resetFormState === true && checkboxFormRef.current !== null) {
      checkboxFormRef.current.reset();
    }
  }, [resetFormState]);

  return (
    <div className='filter__item'>
      <h5 className='filter__item-title'>{title}</h5>
      <form ref={checkboxFormRef}>
        {filterItems.map((item) => (
          <div className='filter__item-group' key={item.value}>
            <CheckboxInput
              item={item}
              checkedItems={checkedItems}
              onCheckHandler={onCheckHandler}
            />
            <label className='filter__item-label' htmlFor={item.value}>
              {item.title}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};
