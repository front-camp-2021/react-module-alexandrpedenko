import { FC } from 'react';
import { Link } from 'react-router-dom';
import './breadcrumbs.scss';

export const Breadcrumbs: FC = () => {
  return (
    <ul className='breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link to='/' className='breadcrumbs__home'></Link>
      </li>
      <li className='breadcrumbs__item'>
        <Link to='/eCommerce' className='breadcrumbs__link'>
          eCommerce
        </Link>
      </li>
      <li className='breadcrumbs__item'>
        <span className='breadcrumbs__current'>Electronics</span>
      </li>
    </ul>
  );
};
