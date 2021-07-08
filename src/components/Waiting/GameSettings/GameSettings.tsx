import React, { ChangeEvent, useContext, useState } from 'react';
import copy from 'copy-to-clipboard';
import { TitleWithIcon } from '../TitleWithIcon';
import './GameSettings.scss';
import {
  Game, GameSettings as Settings, HelpType, RoundType,
} from '../../../models/GameModel';
import { Action } from '../../../reducers/UserReducer';
import { GameContext } from '../../../contexts/GameProvider';
import TimeDropdown from '../TimeDropdown';

interface Props {
  isOwner: boolean
}

const GameSettings = ({ isOwner }: Props) => {
  const [game] = useContext<[Game, React.Dispatch<Action>]>(GameContext);
  const [shareFade, setShareFade] = useState(false)
  const [displayFlashShared, setDisplayFlashShared] = useState(false)
  const [startFade, setStartFade] = useState(false)

  const shareGame = () => {
    setShareFade(true)
    copy(window.location.href)
    setDisplayFlashShared(true)
    setTimeout(() => {
      setDisplayFlashShared(false)
    }, 3000)
  }

  const startGame = () => {
    setStartFade(true)
    game.socket.emit('startGame', { roomId: game.roomId });
  }

  const onSettingsChange = (e: ChangeEvent<HTMLInputElement>, property: Settings) => {
    game.socket.emit('updateSettings', {
      settings: { [property]: e.target.value },
      roomId: game.roomId,
    })
  }

  return (
    <div id="settings">
      <div id="settings-title">
        {/* Empty string for design purpose */}
        <div />
        <h2>Partie Privée</h2>
        <button
          id="share"
          type="button"
          onClick={shareGame}
          className={`${shareFade ? 'fade' : shareFade}`}
          onAnimationEnd={() => setShareFade(false)}
        >
          <img src={require('../../../assets/img/share.png').default} alt="Share icon" />
          <span>{displayFlashShared ? 'Copié !' : 'Inviter'}</span>
        </button>
      </div>

      <div id="draw-time-container">
        <TitleWithIcon text="Temps max par dessin" icon="clock" />
        <TimeDropdown disabled={!isOwner} timeInSeconds={game.drawTime} />
      </div>

      <div id="draw-type-container">
        <TitleWithIcon text="Ce que vous vous faites dessiner" icon="pen" />
        <div id="draw-type">
          <label htmlFor="any">
            <input
              type="radio"
              value={RoundType.BOTH}
              name="type"
              id="any"
              disabled={!isOwner}
              checked={game.type === RoundType.BOTH}
              onChange={(e) => onSettingsChange(e, Settings.TYPE)}
            />
            <span className="label">Peu importe</span>
          </label>
          <label htmlFor="word">
            <input
              type="radio"
              value={RoundType.WORD}
              name="type"
              id="word"
              disabled={!isOwner}
              checked={game.type === RoundType.WORD}
              onChange={(e) => onSettingsChange(e, Settings.TYPE)}
            />
            <span className="label">Un mot</span>
          </label>
          <label htmlFor="sentence">
            <input
              type="radio"
              value={RoundType.SENTENCE}
              name="type"
              id="sentence"
              disabled={!isOwner}
              checked={game.type === RoundType.SENTENCE}
              onChange={(e) => onSettingsChange(e, Settings.TYPE)}
            />
            <span className="label">Une phrase</span>
          </label>
        </div>
      </div>

      <div id="draw-hint-container">
        <TitleWithIcon text="Voulez-vous une aide ?" icon="clock" />
        <div id="draw-hint">
          <label htmlFor="no">
            <input
              type="radio"
              value={HelpType.NONE}
              name="hint"
              id="no"
              disabled={!isOwner}
              checked={game.help === HelpType.NONE}
              onChange={(e) => onSettingsChange(e, Settings.HELP)}
            />
            <span className="label">Non</span>
          </label>
          <label htmlFor="yes">
            <input
              type="radio"
              value={HelpType.LENGTH}
              name="hint"
              id="yes"
              disabled={!isOwner}
              checked={game.help === HelpType.LENGTH}
              onChange={(e) => onSettingsChange(e, Settings.HELP)}
            />
            <span className="label">Afficher la taille de l&apos;expression à trouver</span>
          </label>
        </div>
      </div>

      {!isOwner
        ? <span id="waiting-for-owner">En attente que le chef lance la partie...</span>
        : (
          <button
            type="button"
            id="start-game-btn"
            className={startFade ? 'fade' : ''}
            onClick={startGame}
            onAnimationEnd={() => setStartFade(false)}
          >
            Démarrer
          </button>
        )}
    </div>
  )
}

export default GameSettings;
