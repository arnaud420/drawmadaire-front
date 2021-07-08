import React, { useContext, useEffect, useState } from 'react';
import { User } from '../models/UserModel';
import { Action, SET_USER } from '../reducers/UserReducer';
import { UserContext } from '../contexts/UserProvider';
import { useAPIClient } from './useAPIClient';
import { LOCAL_STORAGE_TOKEN } from '../config/localStorage';

export interface Token {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  // eslint-disable-next-line camelcase
  token_type: string;
}

export const useAutoLogin = () => {
  const [user, dispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(!user.id);
  const [isLogged, setIsLogged] = useState<boolean>(!!user.id);
  const [token, setToken] = useState<Token|null>(null)
  const { get, post } = useAPIClient();

  const refreshToken = async () => {
    if (token) {
      const newToken = await post('/auth/token', {
        token: token.refreshToken,
      }, false);

      if (newToken) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(newToken));
        setToken(newToken);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        autoLog()
      } else {
        setIsLogged(false);
        setIsLoading(false);
      }
    }
  }

  const autoLog = async () => {
    if (token) {
      const user = await get('/users/me');

      if (user) {
        dispatch({
          type: SET_USER,
          payload: { ...user },
        })
        setIsLogged(true);
        setIsLoading(false);
      } else {
        refreshToken()
      }
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    } else {
      setIsLogged(false);
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    if (token && !user.id) {
      autoLog();
    }
  }, [token, user]);

  return {
    userIsLoading: isLoading,
    userIsLogged: isLogged,
  };
}
