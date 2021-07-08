import React from 'react';
import './LoadingScreen.scss';
import loading from '../../../assets/img/spinner-of-dots.png';
import MainContainer from '../MainContainer';

interface Props {}

const LoadingScreen: React.FC<Props> = (props: Props) => (
  <MainContainer>
    <div className="loading-screen">
      <img src={loading} alt="Chargement" />
    </div>
  </MainContainer>
)

export default LoadingScreen;
