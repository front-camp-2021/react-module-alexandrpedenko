import { fireEvent, waitFor } from '@testing-library/react';
import { FilterCheckboxes } from './FilterCheckboxes';

describe('Filter checkboxes', () => {
  const filterItems = [
    { title: 'Asus', value: 'asus' },
    { title: 'Acer', value: 'acer' },
    { title: 'Apple', value: 'apple' },
    { title: 'Dell', value: 'dell' },
  ];

  const checkedItems: string[] = ['dell'];
  const resetFormState = false;
  const setCheckboxToState = jest.fn();
  const removeCheckboxFromState = jest.fn();

  it('Test already checked & click on checkbox event', async () => {
    const { getByTestId, findByTestId } = renderWithStore(() => (
      <FilterCheckboxes
        title='Brand'
        resetFormState={resetFormState}
        checkedItems={checkedItems}
        filterItems={filterItems}
        setCheckboxToState={setCheckboxToState}
        removeCheckboxFromState={removeCheckboxFromState}
      />
    ));

    const checkbox = await findByTestId('dell');
    expect(checkbox).toBeChecked();

    await waitFor(() => {
      const checkbox = getByTestId('acer');

      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});
