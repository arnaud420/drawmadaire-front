/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import './Palette.scss';

interface Props {
  onColorChange: (color: PALETTE_COLORS) => void,
  onBrushSizeChange: (size: number) => void,
  onCancelLastDrawing: () => void,
  onEraseDrawing: () => void,
  disabled: boolean,
}

export enum PALETTE_COLORS {
  BLACK = '#000',
  RED = '#C81B1C',
  BLUE = '#538EDE',
  GREEN = '#249F45',
  YELLOW = '#EBBD18',
  MAGENTA = '#CE53D9',
  BROWN = '#985220',
  GREY = '#9A9A9A',
  WHITE = '#FFF',
}

const Palette: React.FC<Props> = ({
  onColorChange,
  onBrushSizeChange,
  onCancelLastDrawing,
  onEraseDrawing,
  disabled,
}: Props) => {
  const [activeColor, setActiveColor] = useState(PALETTE_COLORS.BLACK)
  const [activeBrush, setActiveBrush] = useState('5')
  const [isChangingBrush, setIsChangingBrush] = useState(false)
  const brushContainerRef = useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    onColorChange(activeColor)
  }, [activeColor])

  useEffect(() => {
    onBrushSizeChange(Number(activeBrush))
  }, [activeBrush])

  const showBrushContainer = () => {
    setIsChangingBrush(prevState => !prevState);
  }

  return (
    <div id="palette-container" className={disabled ? 'disabled' : ''}>
      <div id="brush-container" onClick={() => (!disabled ? showBrushContainer() : null)} className="palette-item">
        <img src={require('../../../../../assets/img/pen.png').default} alt="Brush size chooser icon" />
        { isChangingBrush && (
          <div
            id="brush-selector-container"
            ref={brushContainerRef}
          >
            <div id="brush-size-triangle" />
            <input
              type="range"
              min="5"
              max="15"
              step="5"
              value={activeBrush}
              onChange={(e) => setActiveBrush(e.target.value)}
              id="brush-size-slider"
            />
          </div>
        )}
      </div>
      {Object.keys(PALETTE_COLORS).map(colorKey => (
        <div
          className={`palette-item color ${activeColor === (PALETTE_COLORS as any)[colorKey] ? 'active' : ''}`}
          key={(PALETTE_COLORS as any)[colorKey]}
          style={{ backgroundColor: (PALETTE_COLORS as any)[colorKey] }}
          onClick={() => (!disabled ? setActiveColor((PALETTE_COLORS as any)[colorKey]) : null)}
        />
      ))}
      <div className="action-item palette-item" onClick={() => (!disabled ? onCancelLastDrawing() : null)}>
        <img src={require('../../../../../assets/img/return.png').default} alt="Delete drawing icon" />
      </div>
      <div className="action-item palette-item" onClick={() => (!disabled ? onEraseDrawing() : null)}>
        <img src={require('../../../../../assets/img/delete.png').default} alt="Delete drawing icon" />
      </div>
    </div>
  )
}

export default Palette;
