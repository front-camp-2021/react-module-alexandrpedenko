import { FC } from 'react';
import { useActions, useTypedSelector } from '../../../hooks';
import { IProduct } from '../../../models';
import { Button } from '../button/Button';
import './productCard.scss';

export const ProductCard: FC<IProduct> = (props) => {
  const { images, title, price, brand, category, rating, id } = props;
  const { favoritesIdList } = useTypedSelector((state) => state.favorites);
  const { setToFavoritesList, removeFromFavoritesList, addToCartAction } =
    useActions();

  const productFavoritesButton =
    id && favoritesIdList.includes(id) ? (
      <Button
        text='Remove from wishlist'
        color='secondary'
        size='medium'
        className='product__button'
        onClick={() => removeFromFavoritesList(id)}
      ></Button>
    ) : (
      <Button
        text='Wishlist'
        icon='Heart'
        color='secondary'
        size='medium'
        className='product__button'
        onClick={() => setToFavoritesList(id)}
      ></Button>
    );

  return (
    <div className='product-wrapper'>
      <div className='product'>
        <div className='product__image-wrapper'>
          <img className='product__image' src={images[0]} alt={title} />
        </div>
        <div className='product__rating-price'>
          {rating && (
            <div className='product__rating'>
              <span className='product__rating-text'>{rating}</span>
            </div>
          )}
          <span className='product__price'>${price}</span>
        </div>
        <div className='product__info'>
          <h3 className='product__name'>{title}</h3>
          <span className='product__description'>
            <span data-testid='productCategory'>{category}</span>
            {' | '}
            <span data-testid='productBrand'>{brand}</span>
          </span>
        </div>
        <div className='product__buttons'>
          {productFavoritesButton}
          <Button
            text='Add to cart'
            icon='ShoppingBag'
            color='primary'
            size='medium'
            className='product__button'
            onClick={() => addToCartAction(id)}
          ></Button>
        </div>
      </div>
    </div>
  );
};
