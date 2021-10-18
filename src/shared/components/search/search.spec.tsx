import { screen, fireEvent } from '@testing-library/react';
import { Category } from '../../../pages';
import { Search } from './Search';

describe('Search test', () => {
  const q = '';
  const searchProducts = jest.fn();

  it('Render Search component', () => {
    renderWithStore(() => (
      <Search searchState={q} searchFetchFunction={searchProducts} />
    ));

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Render product when search product', async () => {
    renderWithStore(() => <Category />);

    expect(screen.queryByText('Products Not Found')).toBeNull();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Charcoal Black' },
    });
    const resultArray = await screen.findAllByText(/Charcoal Black/i);
    expect(resultArray[0]).toBeInTheDocument();
    expect(screen.queryByText('Products Not Found')).toBeNull();
  });

  it('Render Not Found when search product', async () => {
    renderWithStore(() => <Category />);

    expect(screen.queryByText('Products Not Found')).toBeNull();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Incorrect search query' },
    });
    expect(await screen.findByText('Products Not Found')).toBeInTheDocument();
  });
});
