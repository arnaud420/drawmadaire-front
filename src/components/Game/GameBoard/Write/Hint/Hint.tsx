import React from 'react';
import './Hint.scss';

interface Props {
  text: string
}

const Hint: React.FC<Props> = ({ text }: Props) => (
  <h4 id="hint">{text}</h4>
)

export default Hint;
