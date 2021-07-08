import React, { ReactElement } from 'react';
import './CardContainer.scss';

interface Props {
  children?: ReactElement | ReactElement[]
  className?: String
}

const CardContainer: React.FC<Props> = ({ children, className }: Props) => (
  <div className={`card-container ${className || ''}`}>
    {children}
  </div>
)

export default CardContainer;
