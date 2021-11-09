import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions, useTypedSelector } from '../../hooks';
import {
  WithSidebar,
  SidebarFilter,
  ProductCard,
  Search,
  Button,
  Pagination,
  Spinner,
} from '../../shared';
import './category.scss';

export const Category: FC = () => {
  const history = useHistory();
  const { paginateProducts, searchProducts } = useActions();
  const {
    products,
    isLoading,
    categories,
    brands,
    queryUrl: { q },
  } = useTypedSelector((state) => state.category);
  const { favoritesIdList } = useTypedSelector((state) => state.favorites);
  const { cartProductsIdList } = useTypedSelector((state) => state.cart);
  const { data, totalCount, currentPage } = products;

  return (
    <WithSidebar
      sidebar={<SidebarFilter categories={categories} brands={brands} />}
      pagination={
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          paginatePageFunction={paginateProducts}
        />
      }
    >
      <>
        <div className='search'>
          <div className='search__results'>
            <span className='search__results-text'>
              {totalCount} results found
            </span>
            <div className='search__buttons'>
              <div className='search__buttons-wrapper'>
                <Button
                  icon='HeartWhite'
                  size='icon'
                  color='primary'
                  onClick={() => history.push('/favorites')}
                />
                {favoritesIdList.length > 0 && (
                  <span className='search__buttons-count'>
                    {favoritesIdList.length}
                  </span>
                )}
              </div>
              <div className='search__buttons-wrapper'>
                <Button
                  icon='ShoppingBag'
                  size='icon'
                  color='primary'
                  onClick={() => history.push('/cart')}
                />
                {cartProductsIdList.length > 0 && (
                  <span className='search__buttons-count'>
                    {cartProductsIdList.length}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Search searchState={q} searchFetchFunction={searchProducts} />
        </div>

        {isLoading && <Spinner />}

        <div className='product-list'>
          {data && data.map((item) => <ProductCard key={item.id} {...item} />)}
          {!isLoading && data && data.length < 1 && (
            <div className='not-found'>
              <h2>Products Not Found</h2>
            </div>
          )}
        </div>
      </>
    </WithSidebar>
  );
};
