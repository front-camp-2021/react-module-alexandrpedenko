import { ChangeEvent } from 'react';
import { PreparedFiltersInterface } from '../../types';

export const CheckboxInput = ({
  item,
  checkedItems,
  onCheckHandler,
}: {
  item: PreparedFiltersInterface;
  checkedItems: string[];
  onCheckHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  if (checkedItems.length > 0 && checkedItems.includes(item.value)) {
    return (
      <input
        type='checkbox'
        data-testid={item.value}
        className='filter__item-checkbox'
        value={item.value}
        id={item.value}
        checked={true}
        onChange={(event) => onCheckHandler(event)}
      />
    );
  }

  return (
    <input
      type='checkbox'
      data-testid={item.value}
      className='filter__item-checkbox'
      value={item.value}
      id={item.value}
      onChange={(event) => onCheckHandler(event)}
    />
  );
};
