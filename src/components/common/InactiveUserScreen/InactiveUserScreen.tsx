import React from 'react';
import './InactiveUserScreen.scss';
import loading from '../../../assets/img/spinner-of-dots.png';
import MainContainer from '../MainContainer';
import CardContainer from '../CardContainer';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';

interface Props {}

const InactiveUserScreen: React.FC<Props> = (props: Props) => (
  <div>
    <CardContainer>
      <div className="inactive-user-screen">
        <div className="logo">
          <Logo id="logo" width={100} height={100} />
          <h1>Drawmadaire</h1>
        </div>

        <h2>Votre inscription a bien été prise en compte !</h2>

        <p>Checkez vos mails pour finaliser votre inscription. (Pensez à regarder vos spams)</p>
      </div>
    </CardContainer>
  </div>
)

export default InactiveUserScreen;
