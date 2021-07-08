import React, { useContext } from 'react';
import { LOCAL_STORAGE_TOKEN } from '../config/localStorage';
import { Token } from './useAutoLogin';
import { App } from '../models/AppModel';
import { Action } from '../reducers/UserReducer';
import { AppContext } from '../contexts/AppProvider';
import { SET_ERROR } from '../reducers/AppReducer';

const getToken = () => {
  const stringToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  if (stringToken) {
    const storedToken: Token = JSON.parse(stringToken);
    return storedToken.accessToken;
  }

  return null;
}

export const useAPIClient = () => {
  const [appState, appDispatch] = useContext<[App, React.Dispatch<Action>]>(AppContext);

  /**
   * Build headers request.
   * @param withToken
   */
  const getHeaders = (withToken: boolean = true): Record<string, string> => {
    const token = getToken()
    return withToken && token ? ({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    }) : ({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  }

  /**
   * Get request.
   * @param endpoint
   * @param withToken
   */
  const get = async (endpoint: string, withToken: boolean = true) => {
    try {
      const request = await fetch(process.env.REACT_APP_API_URL + endpoint, {
        method: 'GET',
        headers: getHeaders(withToken),
      })

      const response = await request.json();
      return response.data;
    } catch (e) {
      console.error(e)
    }

    return null;
  }

  /**
   * Post request.
   * @param endpoint
   * @param data
   * @param withToken
   */
  const post = async (endpoint: string, data: any, withToken: boolean = true) => {
    try {
      const request = await fetch(process.env.REACT_APP_API_URL + endpoint, {
        method: 'POST',
        headers: getHeaders(withToken),
        body: JSON.stringify(data),
      })

      if (request.status >= 400) {
        const response = await request.json();
        throw new Error(response.message || 'Une erreur s\'est produite');
      }

      const response = await request.json();

      if (response.success === false) {
        throw new Error(response.error || 'Une erreur s\'est produite');
      }

      return response.data ? response.data : response || 'success';
    } catch (e) {
      appDispatch({
        type: SET_ERROR,
        payload: String(e),
      })
    }

    return null;
  }

  return { get, post };
}
