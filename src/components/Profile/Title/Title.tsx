import React from 'react';
import './Title.scss';

interface Props {
  children: string,
}

const Title: React.FC<Props> = ({ children }: Props) => (
  <h2>
    {children}
  </h2>
);

export default Title;
