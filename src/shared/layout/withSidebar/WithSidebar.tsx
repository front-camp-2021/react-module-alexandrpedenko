import { FC, ReactElement } from 'react';
import './withSidebar.scss';

interface WithSidebarProps {
  sidebar: ReactElement;
  pagination: ReactElement;
  children: ReactElement;
}

export const WithSidebar: FC<WithSidebarProps> = ({
  sidebar,
  pagination,
  children,
}) => {
  return (
    <>
      <div className='category'>
        <div className='category__row'>
          <aside className='category__sidebar'>{sidebar}</aside>
          <main className='category__main'>{children}</main>
        </div>
      </div>
      {pagination}
    </>
  );
};
