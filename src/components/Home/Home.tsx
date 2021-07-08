import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/logo.svg'
import './HomeStyles.scss'
import CardContainer from '../common/CardContainer';
import PlayerForm from '../Form/PlayerForm';
import { BUTTON_COLOR } from '../common/Button/Button';
import { useAutoLogin } from '../../hooks/useAutoLogin';
import JoinGameButton from './JoinGameButton';
import { useGameClient } from '../../hooks/useGameClient';
import withUserLoading from '../../hoc/withUserLoading';
import LoginButton from './LoginButton';

const Home = () => {
  const history = useHistory();
  const location = useLocation<{ room: string }>();
  const { createGame } = useGameClient();
  useAutoLogin();

  return (
    <div>
      <CardContainer>
        <LoginButton />

        <div className="logo">
          <Logo id="logo" />
          <h1>Drawmadaire</h1>
        </div>

        <PlayerForm />

        <div className="buttons">
          {
            location.state
              ? (
                <JoinGameButton
                  label="Rejoindre la partie"
                  color={BUTTON_COLOR.BLUE}
                  action={() => history.push(`/game/${location.state.room}`)}
                />
              ) : (
                <>
                  {/* <JoinGameButton */}
                  {/*  label="Rejoindre une partie publique" */}
                  {/*  color={BUTTON_COLOR.BLUE} */}
                  {/*  action={() => createGame(true)} */}
                  {/* /> */}

                  <JoinGameButton
                    label="Créer une partie privée"
                    color={BUTTON_COLOR.BLUE}
                    action={() => createGame()}
                  />
                </>
              )
          }
        </div>
      </CardContainer>
    </div>
  )
}

export default withUserLoading(Home);
