import { FC, useEffect, useState } from 'react';
import { calcTotalPrice, FullWidth } from '../../shared';
import { CartItem } from './components';
import './cart.scss';
import { useTypedSelector } from '../../hooks';

export const Cart: FC = () => {
  const { cartProducts } = useTypedSelector((state) => state.cart);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    setTotalCartPrice(calcTotalPrice(cartProducts));
  }, [cartProducts]);

  return (
    <FullWidth>
      <>
        <h1>Cart</h1>
        <div className='cart'>
          {cartProducts.map((product) => (
            <CartItem key={product.product.id} {...product} />
          ))}
          {cartProducts.length < 1 && <h3>Not products in your cart</h3>}
        </div>
        <div className='cart-total-price'>
          <div className='cart-total-price__title'>Total Cart Price</div>
          <div className='cart-total-price__price'>$ {totalCartPrice}</div>
        </div>
      </>
    </FullWidth>
  );
};
