import { FC } from 'react';
import { range } from '../../utils';
import { Button } from '..';
import { RootState } from '../../../store';
import './pagination.scss';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  paginatePageFunction: (
    page: number
  ) => (dispatch: any, getState: () => RootState) => Promise<void>;
}

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  currentPage,
  paginatePageFunction,
}) => {
  let paginationItems: number[] = [];
  let paginationTotal: number = 0;

  if (process.env.REACT_APP_PAGE_LIMIT) {
    const pageLimit = parseInt(process.env.REACT_APP_PAGE_LIMIT);
    paginationTotal = Math.ceil(totalCount / pageLimit);
    paginationItems = range(1, paginationTotal);
  }

  const onPaginationClick = (value: number) => {
    paginatePageFunction(value);
  };

  return (
    <div className='pagination'>
      <div className='pagination__previous'>
        {currentPage > 1 && (
          <Button
            icon='ChevronLeft'
            color='secondary'
            className='pagination__item-link'
            onClick={() => onPaginationClick(currentPage - 1)}
          />
        )}
      </div>
      <div className='pagination__items'>
        {paginationItems.map((value) => {
          if (currentPage === value) {
            return (
              <span className='pagination__item-current' key={value}>
                {value}
              </span>
            );
          } else {
            return (
              <Button
                key={value}
                text={value}
                color='secondary'
                className='pagination__item-link'
                onClick={() => onPaginationClick(value)}
              />
            );
          }
        })}
      </div>
      <div className='pagination__next'>
        {currentPage < paginationTotal && (
          <Button
            icon='ChevronRight'
            color='secondary'
            className='pagination__item-link'
            onClick={() => onPaginationClick(currentPage + 1)}
          />
        )}
      </div>
    </div>
  );
};
