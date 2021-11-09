import { fireEvent, waitFor } from '@testing-library/react';
import { SidebarFilter } from './SidebarFilter';

describe('Sidebar Filters Test', () => {
  const brands = ['Asus', 'Acer', 'Apple', 'Dell'];
  const categories = ['Monitors', 'Laptops', 'Video cards'];

  let resetFiltersButton: HTMLElement;
  let acerFilterCheckbox: HTMLElement;

  beforeEach(() => {
    const { getByTestId } = renderWithStore(() => (
      <SidebarFilter categories={categories} brands={brands} />
    ));
    resetFiltersButton = getByTestId('resetFilters');
    acerFilterCheckbox = getByTestId('acer');

    fireEvent.click(resetFiltersButton);
  });

  it('Check Brand in filter', async () => {
    await waitFor(() => {
      expect(acerFilterCheckbox).not.toBeChecked();
      fireEvent.click(acerFilterCheckbox);
      expect(acerFilterCheckbox).toBeChecked();
    });

    fireEvent.click(resetFiltersButton);
    expect(acerFilterCheckbox).not.toBeChecked();
  });
});
