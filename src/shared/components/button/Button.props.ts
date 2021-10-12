import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import Heart from './images/heart.svg';
import HeartWhite from './images/heart-white.svg';
import ChevronsRight from './images/chevrons-right.svg';
import ChevronRight from './images/chevron-right.svg';
import ChevronLeft from './images/chevron-left.svg';

import ShoppingBag from './images/shopping-bag.svg';

export const icons = {
  Heart,
  HeartWhite,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
};

export type IconName = keyof typeof icons;

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string | number;
  icon?: IconName;
  size?: 'medium' | 'icon';
  color: 'primary' | 'white' | 'secondary';
}
