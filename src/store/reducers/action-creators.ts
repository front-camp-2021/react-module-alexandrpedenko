import { CategoryActionCreators } from './category/action-creators';
import { FavoritesActionCreators } from './favorites/action-creators';
import { CartActionCreators } from './cart/action-creators';

export const AllActionCreators = {
  ...CategoryActionCreators,
  ...FavoritesActionCreators,
  ...CartActionCreators,
};
