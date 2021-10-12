import { ChangeEvent, useEffect, useRef } from 'react';
import { preparedFiltersInterface } from '../../types';
import './filterCheckboxes.scss';

export interface FilterCheckboxesProps {
  title: string;
  filterItems: preparedFiltersInterface[];
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

  const returnChecked = (value: string) => {
    if (checkedItems.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='filter__item'>
      <h5 className='filter__item-title'>{title}</h5>
      <form ref={checkboxFormRef}>
        {filterItems.map((item) => (
          <div className='filter__item-group' key={item.value}>
            <input
              type='checkbox'
              className='filter__item-checkbox'
              value={item.value}
              id={item.value}
              checked={returnChecked(item.value)}
              onChange={(event) => onCheckHandler(event)}
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
