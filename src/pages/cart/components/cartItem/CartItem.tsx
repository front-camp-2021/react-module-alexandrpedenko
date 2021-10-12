import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useActions } from '../../../../hooks';
import { Button } from '../../../../shared';
import { CartProductInterface } from '../../../../store/reducers/cart/types';
import './cartItem.scss';

export const CartItem: FC<CartProductInterface> = (productPops) => {
  const { product, productCount } = productPops;

  const {
    incrementProductCountAction,
    decrementProductCountAction,
    changeProductCountAction,
    deleteCartProduct,
  } = useActions();
  const [cartItemCount, setCartItemCount] = useState(productCount || 1);
  const [cartItemTotalPrice, setCartItemTotalPrice] = useState(product.price);

  useEffect(() => {
    setCartItemTotalPrice(product.price * cartItemCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemCount]);

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(parseInt(event.target.value)) ||
      parseInt(event.target.value) === 0
    )
      return;

    setCartItemCount(parseInt(event.target.value));
    changeProductCountAction(product.id, parseInt(event.target.value));
  };

  const incrementCountHandler = () => {
    setCartItemCount((prevState) => prevState + 1);
    incrementProductCountAction(product.id);
  };

  const decrementCountHandler = () => {
    if (cartItemCount === 1) return;
    setCartItemCount((prevState) => prevState - 1);
    decrementProductCountAction(product.id);
  };

  return (
    <div className='cart-item'>
      <div className='cart-item__title-image'>
        <img
          src={product.images[0]}
          alt={product.title}
          className='cart-item__image'
        />
        <div className='cart-item__title'>{product.title}</div>
      </div>
      <div className='cart-item__price'>${product.price} x</div>
      <div className='cart-item__counts'>
        <Button
          text='-'
          size='icon'
          color='secondary'
          className='cart-item__button'
          onClick={decrementCountHandler}
        />
        <input
          type='number'
          min='1'
          className='cart-item__count-input'
          value={cartItemCount}
          onChange={onInputChangeHandler}
        />
        <Button
          text='+'
          size='icon'
          color='secondary'
          className='cart-item__button'
          onClick={incrementCountHandler}
        />
      </div>
      <div className='cart-item__total-price'>${cartItemTotalPrice}</div>
      <Button
        text='Delete'
        size='medium'
        color='secondary'
        className='cart-item__button cart-item__button-delete'
        onClick={() => deleteCartProduct(product.id)}
      />
    </div>
  );
};
