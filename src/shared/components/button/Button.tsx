import cn from 'classnames';

import { ButtonProps, icons } from './Button.props';
import './button.scss';

export const Button = ({
  text,
  icon,
  size,
  color,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  const IconComp = icon ? icons[icon] : '';

  return (
    <button
      className={cn('button', className, {
        button_medium: size === 'medium',
        button_icon: size === 'icon',
        button_primary: color === 'primary',
        button_secondary: color === 'secondary',
        button_white: color === 'white',
      })}
      {...props}
    >
      {icon && <img src={IconComp} alt='icon' />}
      {icon && text && <span>&nbsp;</span>}
      {text && <span>{text}</span>}
    </button>
  );
};
