import React, { ChangeEvent, useContext } from 'react';
import './UsernameInput.scss';
import { UserContext } from '../../../contexts/UserProvider';
import { Action, SET_PSEUDO } from '../../../reducers/UserReducer';
import { User } from '../../../models/UserModel';

const UsernameInput: React.FC = () => {
  const [state, dispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_PSEUDO,
      payload: e.target.value,
    })
  }

  return (
    <div>
      <input
        type="text"
        value={state.pseudo}
        onChange={onChange}
        placeholder="Pseudo"
      />
    </div>
  )
}

export default UsernameInput;
