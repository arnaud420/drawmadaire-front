import React from 'react'
import './Header.scss'
import { ReactComponent as Logo } from '../../../assets/img/logo.svg'

interface Props {
    textColor: string
}

const Header = ({ textColor }: Props) => (
  <div id="header">
    <Logo id="logo" />
    <span className={textColor}>
      Drawmadaire
    </span>
  </div>
)

export default Header
