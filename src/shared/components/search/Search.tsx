import { useState, useEffect, useRef } from 'react';
import { useActions, useDebounce } from '../../../hooks';
import './search.scss';

interface SearchProps {
  searchState: string | null;
  searchFetchFunction: Function;
}

export const Search = ({ searchState, searchFetchFunction }: SearchProps) => {
  const { searchProducts } = useActions();
  const [searchQuery, setSearchQuery] = useState(searchState || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);

  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      searchProducts(debouncedSearchQuery);
    }

    firstMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!firstMount.current && searchState?.length === 0) {
      setSearchQuery('');
    }

    firstMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState]);

  return (
    <form className='search__form'>
      <input
        type='text'
        name='search'
        value={searchQuery}
        placeholder='Search'
        className='search__form-input'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};
