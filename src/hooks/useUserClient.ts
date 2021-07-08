import React, { useContext } from 'react';
import { User } from '../models/UserModel';
import { Action, SET_USER } from '../reducers/UserReducer';
import { UserContext } from '../contexts/UserProvider';
import { useAPIClient } from './useAPIClient';
import { LOCAL_STORAGE_TOKEN } from '../config/localStorage';

export const useUserClient = () => {
  const [user, dispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const { post } = useAPIClient();

  const createUnauthUser = async () => {
    const data = await post('/auth/register/unauth', {
      pseudo: user.pseudo,
      avatar: JSON.stringify(user.avatar),
    });

    if (data) {
      await dispatch({
        type: SET_USER,
        payload: data.user,
      })

      localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(data.token))
    }
  }

  const updateUser = async () => {
    await post('/auth/update-avatar', {
      id: user.id,
      avatar: JSON.stringify(user.avatar),
    });
  }

  return { createUnauthUser, updateUser };
}
