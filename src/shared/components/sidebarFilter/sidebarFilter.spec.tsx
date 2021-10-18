import { fireEvent, render, waitFor } from '@testing-library/react';
import { SidebarFilter } from './SidebarFilter';
import { Category } from '../../../pages/category/Category';

describe('Sidebar Filters Test', () => {
  const brands = ['Asus', 'Acer', 'Apple', 'Dell'];
  const categories = ['Monitors', 'Laptops', 'Video cards'];

  it('Check Brand and Price value', async () => {
    const { getByTestId } = renderWithStore(() => (
      <SidebarFilter categories={categories} brands={brands} />
    ));

    await waitFor(() => {
      const checkbox = getByTestId('acer');

      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});
