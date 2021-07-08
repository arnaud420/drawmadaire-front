import React, { useContext } from 'react';
import './LoginButton.scss';
import { Link } from 'react-router-dom';
import { SET_IS_MODAL_OPENED } from '../../../reducers/AppReducer';
import { Avatar } from '../../common/Avatar';
import Camel from '../../common/Avatar/Camel';
import { User } from '../../../models/UserModel';
import { Action } from '../../../reducers/UserReducer';
import { UserContext } from '../../../contexts/UserProvider';
import { App } from '../../../models/AppModel';
import { AppContext } from '../../../contexts/AppProvider';

interface Props {}

const LoginButton: React.FC<Props> = () => {
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const [app, appDispatch] = useContext<[App, React.Dispatch<Action>]>(AppContext);

  return (
    <div className="login">
      <button
        type="button"
        onClick={() => {
          if (!user.email) {
            appDispatch({
              type: SET_IS_MODAL_OPENED,
              payload: true,
            })
          }
        }}
      >
        {
          user.email
            // Then the user is logged with an authenticated account
            ? (
              <Link to="/profile">
                <Avatar
                  color={user.avatar.color}
                  head={user.avatar.head}
                  mouth={user.avatar.mouth}
                  size={60}
                />
              </Link>
            )
            : (
              <>
                <Camel color="white" size={45} />
                Connexion
              </>
            )
        }
      </button>
    </div>
  );
}

export default LoginButton;
