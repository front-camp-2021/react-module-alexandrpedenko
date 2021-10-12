import { FC } from 'react';
import Logo from './logo.svg';
import './header.scss';

export const Header: FC = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <img src={Logo} className='header__logo-img' alt='Store Logo'></img>
        <div className='header__logo-text'>Online Store</div>
      </div>
    </header>
  );
};
