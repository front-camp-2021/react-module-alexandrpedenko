import { FC, useEffect } from 'react';
import { useActions, useTypedSelector } from '../../hooks';
import { FullWidth, ProductCard } from '../../shared';
import './favorites.scss';

export const Favorites: FC = () => {
  const { loadFavoritesProducts } = useActions();
  const { favoritesIdList, isFavoritesLoading, favoritesProducts } =
    useTypedSelector((state) => state.favorites);

  useEffect(() => {
    if (favoritesIdList.length > 0) {
      loadFavoritesProducts(favoritesIdList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesIdList]);

  return (
    <FullWidth>
      <>
        <h1>Your favorites list</h1>
        <div className='favorites'>
          <div className='product-list'>
            {favoritesProducts &&
              favoritesProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}

            {!isFavoritesLoading && favoritesProducts.length < 1 && (
              <div className='not-found'>
                <h4>Not products in your favorites yet</h4>
              </div>
            )}
          </div>
        </div>
      </>
    </FullWidth>
  );
};
