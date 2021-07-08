import React, { useContext, useEffect, useState } from 'react'
import './Modal.scss'
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';
import { Action } from '../../../reducers/UserReducer'
import { App } from '../../../models/AppModel'
import { AppContext } from '../../../contexts/AppProvider'
import { SET_IS_MODAL_OPENED } from '../../../reducers/AppReducer'

enum AUTHENTICATION_STEP {
  REGISTER = 'register',
  LOGIN = 'login'
}

const Modal = () => {
  const [authenticationStep, setAuthenticationStep] = useState<AUTHENTICATION_STEP>(
    AUTHENTICATION_STEP.LOGIN,
  )
  const [{ isModalOpened }, dispatch] = useContext<[App, React.Dispatch<Action>]>(AppContext);

  useEffect(() => {
    if (!isModalOpened) {
      // Reset modal on close
      setAuthenticationStep(AUTHENTICATION_STEP.LOGIN)
    }
  }, [isModalOpened])

  const closeModal = () => {
    dispatch({
      type: SET_IS_MODAL_OPENED,
      payload: false,
    })
  }

  return (
    <div id="modal-body" className={`wh-100 ${isModalOpened ? 'show-modal' : 'hide-modal'}`}>
      <div id="modal-content">
        <span className="close" onClick={closeModal} />
        {
          authenticationStep === AUTHENTICATION_STEP.LOGIN
            ? <Login switchToRegister={() => setAuthenticationStep(AUTHENTICATION_STEP.REGISTER)} />
            : <Register switchToLogin={() => setAuthenticationStep(AUTHENTICATION_STEP.LOGIN)} />
        }
      </div>
    </div>
  )
};

export default Modal;
