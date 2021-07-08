import React from 'react';
import Loader from 'react-loader-spinner';
import './Button.scss';

export enum BUTTON_COLOR {
  BLUE = '#538FDE',
  BROWN = '#BF7E68',
}

interface Props {
  label: string;
  onClick?: () => void;
  color: BUTTON_COLOR;
  disabled?: boolean;
  type?: 'button'|'submit'|'reset';
  isLoading?: boolean
}

/* eslint-disable react/button-has-type */
const Button: React.FC<Props> = ({
  label,
  onClick,
  color,
  disabled,
  type,
  isLoading = false,
}: Props) => (
  <button
    type={type ?? 'button'}
    onClick={onClick}
    style={{ backgroundColor: color }}
    className={isLoading ? 'loading' : ''}
    disabled={disabled}
  >
    {isLoading && (
      <Loader
        type="TailSpin"
        color="#fff"
        height={10}
        width={10}
      />
    )}
    {label}
  </button>
)

Button.defaultProps = {
  disabled: false,
}

export default Button;
