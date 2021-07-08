import React from 'react'
import { useHistory } from 'react-router-dom'
import './Header.scss'
import { ReactComponent as Logo } from '../../../../assets/img/logo.svg'

const Header = ({ arrowBack }: { arrowBack: boolean }) => {
  const history = useHistory()

  return (
    <div id="header">
      {
        arrowBack
          ? (
            <button id="arrow-back" type="button" onClick={history.goBack}>
              <img
                src={require('../../../../assets/img/left-arrow-white.png').default}
                alt="Go back arrow icon"
              />
            </button>
          )
          : null
      }
      <Logo id="logo" />
      <span>
        Drawmadaire
      </span>
    </div>
  )
}

export default Header
