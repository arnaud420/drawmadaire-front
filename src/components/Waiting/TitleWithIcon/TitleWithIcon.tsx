import React from 'react';
import './TitleWithIcon.scss';

interface Props {
  text: string,
  icon: string,
}

const TitleWithIcon: React.FC<Props> = ({ text, icon }: Props) => (
  <div className="title-with-icon">
    <img src={require(`../../../assets/img/${icon}.png`).default} alt="Section title icon" />
    <h3>{text}</h3>
  </div>
);

export default TitleWithIcon;
