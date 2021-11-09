import { screen } from '@testing-library/react';
import { Category } from './Category';

describe('Category Test', () => {
  it('Render Search component in Category', () => {
    renderWithStore(() => <Category />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Render Filter component in Category', async () => {
    renderWithStore(() => <Category />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();

    expect(await screen.findByText('Brand')).toBeInTheDocument();
    expect(await screen.findByText('Category')).toBeInTheDocument();
  });
});
