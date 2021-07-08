import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Game as GameModel } from '../../../models/GameModel';
import { Action, SET_RESULTS } from '../../../reducers/GameReducer';
import { GameContext } from '../../../contexts/GameProvider';
import MainContainer from '../../common/MainContainer';
import Badges from './Badges';
import ResultsSlider from './ResultsSlider';
import { useAPIClient } from '../../../hooks/useAPIClient';
import './Results.scss';
import LoadingScreen from '../../common/LoadingScreen';

const Results = () => {
  const [game, dispatch] = useContext<[GameModel, React.Dispatch<Action>]>(GameContext);
  const { get } = useAPIClient();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // test function
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsLoading(true);
  //       const data = await get('/games/145/results');
  //       setIsLoading(false)
  //       dispatch({
  //         type: SET_RESULTS,
  //         payload: {
  //           results: data.gameHistories,
  //         },
  //       });
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //   })()
  // }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <MainContainer fullScreen={false}>
      <div id="results-container">
        <h1>Résultats</h1>
        <div className="results-content-container">
          {
            game && game.results && game.results.length >= 1
              ? (
                <>
                  <ResultsSlider gameHistories={game.results} />
                  <Badges />
                </>
              )
              : <div>Aucun résultats</div>
          }
          <button id="btn-quit-game" type="button" onClick={() => history.push('/')}>
            Revenir à l&apos;accueil
          </button>
        </div>
      </div>
    </MainContainer>
  )
}

export default Results
