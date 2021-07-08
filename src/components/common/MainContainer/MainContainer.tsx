import React, { ReactNode } from 'react'
import Header from './Header'
import './MainContainer.scss'

interface Props {
  children?: ReactNode|ReactNode[],
  arrowBack?: boolean,
  fullScreen?: boolean,
}

const MainContainer = ({ children, arrowBack = false, fullScreen = true }: Props) => (
  <div id={fullScreen ? 'full-screen' : ''}>
    <div id="main-container">
      <Header arrowBack={arrowBack} />
      {children}
    </div>
  </div>
)

export default MainContainer
