import React, { useEffect, useState } from 'react';
import CanvasDraw from './CanvasDraw';
import { PALETTE_COLORS } from '../../Game/GameBoard/Draw/Palette';
import './Canvas.scss';
import { isJsonString } from '../../../helpers/generic';

interface Props {
  height: string | number,
  width: string | number,
  brushColor?: PALETTE_COLORS | null,
  brushRadius?: number | null,
  disabled?: boolean,
  defaultDrawing?: string,
  forwardRef?: (ref: CanvasDraw | null) => void,
  immediateDrawing?: boolean,
}

const Canvas: React.FC<Props> = ({
  height,
  width,
  disabled = false,
  defaultDrawing,
  brushColor,
  brushRadius,
  forwardRef,
  immediateDrawing,
}: Props) => {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null)

  useEffect(() => {
    if (forwardRef) {
      forwardRef(canvasRef)
    }
  }, [canvasRef])

  useEffect(() => {
    if (defaultDrawing && canvasRef) {
      if (isJsonString(defaultDrawing)) {
        canvasRef.loadSaveData(defaultDrawing)
      }
    }
  }, [defaultDrawing, canvasRef])

  return (
    <CanvasDraw
      ref={ref => setCanvasRef(ref)}
      disabled={disabled}
      className="canvas"
      canvasHeight={height}
      canvasWidth={width}
      brushColor={brushColor ?? PALETTE_COLORS.BLACK}
      brushRadius={brushRadius ?? 5}
      hideInterface={disabled}
      hideGrid={disabled}
      catenaryColor={brushColor as string}
      lazyRadius={0}
    />
  )
}

export default Canvas;
