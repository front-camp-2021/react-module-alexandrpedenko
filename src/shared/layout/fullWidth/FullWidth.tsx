import { FC, ReactElement } from 'react';
import './fullWidth.scss';

interface FullWidthProps {
  children: ReactElement;
}

export const FullWidth: FC<FullWidthProps> = ({ children }) => {
  return (
    <>
      <div className='full-width'>
        <div className='full-width__row'>
          <main className='full-width__main'>{children}</main>
        </div>
      </div>
    </>
  );
};
