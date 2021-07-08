/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Canvas from '../../../common/Canvas';
import Palette, { PALETTE_COLORS } from './Palette';
import './Draw.scss';
import TextInputWithButton from '../TextInputWithButton';
import { Game as GameModel, GamePhase } from '../../../../models/GameModel';
import { Action, SET_TIME } from '../../../../reducers/GameReducer';
import { GameContext } from '../../../../contexts/GameProvider';
import { usePlayer } from '../../../../hooks/usePlayer';

interface Props {
  withPalette?: boolean,
  withInput?: boolean,
}

const Draw: React.FC<Props> = ({
  withPalette = true,
  withInput = false,
}) => {
  const [game, dispatch] = useContext<[GameModel, React.Dispatch<Action>]>(GameContext);
  const [brushColor, setBrushColor] = useState<PALETTE_COLORS>(PALETTE_COLORS.BLACK)
  const [brushRadius, setBrushRadius] = useState<number>(5)
  const [canvasRef, setCanvasRef] = useState<any>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [isValidated, setIsValidated] = useState(false);
  const validateBtnRef = useRef<HTMLButtonElement | null>(null)
  const player = usePlayer();

  const socketSendItem = (content: string) => {
    if (player) {
      game.socket.emit('sendItem', {
        gameId: game.id,
        content,
        playerId: player.id,
        gameHistoryId: game.receivedItem!.gameHistory.id,
      })
    }
  }

  const onGuessSubmit = (value: string) => {
    if (!isValidated) {
      setIsValidated(true)
      socketSendItem(value)
    }
  }

  const onDrawSubmit = () => {
    if (!isValidated) {
      setIsValidated(true)
      socketSendItem(canvasRef!.getSaveData())

      // Btn animations
      validateBtnRef.current?.classList.add('clicked')
      setTimeout(() => {
        validateBtnRef.current?.classList.remove('clicked')
      }, 1000)
    }
  }

  /**
   * Send items if timer is finished.
   */
  useEffect(() => {
    if (game.remainingTime === 0) {
      dispatch({ type: SET_TIME, payload: game.drawTime })

      if (!isValidated) {
        if (game.phase === GamePhase.DRAW) {
          onDrawSubmit();
        }
        if (game.phase === GamePhase.GUESS) {
          onGuessSubmit(inputValue);
        }
      }
    }
  }, [game.remainingTime, isValidated])

  /**
   * Clear canvas on phase change.
   */
  useEffect(() => {
    setIsValidated(false)
    if (canvasRef) {
      canvasRef.clear()
    }
  }, [withPalette, canvasRef])

  return (
    <div id="game-board-container">
      <Canvas
        height="100%"
        width="100%"
        brushColor={brushColor}
        brushRadius={brushRadius}
        forwardRef={setCanvasRef}
        disabled={withInput || isValidated}
        defaultDrawing={withInput ? game.receivedItem!.content : undefined}
        immediateDrawing={false}
      />
      {withPalette && (
        <div className="board-options">
          <Palette
            disabled={isValidated}
            onColorChange={setBrushColor}
            onBrushSizeChange={setBrushRadius}
            onCancelLastDrawing={() => {
              if (canvasRef) {
                canvasRef.undo()
              }
            }}
            onEraseDrawing={() => {
              if (canvasRef) {
                canvasRef.clear()
              }
            }}
          />

          <button
            type="button"
            id="validate-button"
            ref={validateBtnRef}
            onClick={onDrawSubmit}
            disabled={isValidated}
          >
            Valider
          </button>
        </div>
      )}
      {withInput && (
        <TextInputWithButton
          onValidate={onGuessSubmit}
          withMarginTop
          disabled={isValidated}
          onChange={(value) => setInputValue(value)}
        />
      )}
    </div>
  );
}

export default Draw;
