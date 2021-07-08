import React, { useContext, useEffect, useState } from 'react';
import './FlashMessage.scss';
import { Action } from '../../../reducers/UserReducer';
import { App, Message, MessageType } from '../../../models/AppModel';
import { AppContext } from '../../../contexts/AppProvider';
import close from '../../../assets/img/close.png';
import { CLEAR_MESSAGE } from '../../../reducers/AppReducer';

interface Props {}

const FlashMessage: React.FC<Props> = () => {
  const [app, dispatch] = useContext<[App, React.Dispatch<Action>]>(AppContext);
  const [message, setMessage] = useState<Message|null>();

  const clearMessage = () => {
    setMessage(null)
    dispatch({ type: CLEAR_MESSAGE })
  }

  useEffect(() => {
    if (app.message && app.message.content) {
      setMessage(app.message);

      setTimeout(() => clearMessage(), 5000);
    }
  }, [app.message]);

  return (
    <div id="flash-message" className={message ? `active ${message.type}` : ''}>
      {
        message && (
          <>
            <span>{message.content}</span>
            <span onClick={clearMessage}>
              <img src={close} alt="close-message" />
            </span>
          </>
        )
      }
    </div>
  )
}

export default FlashMessage;
