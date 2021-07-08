import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAPIClient } from './useAPIClient';
import { User } from '../models/UserModel'
import { Action, SET_USER } from '../reducers/UserReducer'
import { UserContext } from '../contexts/UserProvider'
import { App } from '../models/AppModel'
import { AppContext } from '../contexts/AppProvider'
import { SET_ERROR, SET_IS_MODAL_OPENED, SET_SUCCESS } from '../reducers/AppReducer'
import { LOCAL_STORAGE_TOKEN } from '../config/localStorage'

interface RegisterData {
  id?: number,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
}

interface UpdateData {
  id?: number,
  pseudo: string,
  password: string,
  newPassword: string,
  avatar: string,
}

interface LoginData {
  login: string,
  password: string,
}

export const useAuthentication = () => {
  const [userState, userDispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const [appState, appDispatch] = useContext<[App, React.Dispatch<Action>]>(AppContext);
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const { post } = useAPIClient()

  const login = async (loginData: LoginData) => {
    setIsLoading(true)
    post('/auth/login', loginData)
      .then(({ user, token }) => {
        setIsLoading(false)
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(token))
        userDispatch({
          type: SET_USER,
          payload: user,
        })
        appDispatch({
          type: SET_IS_MODAL_OPENED,
          payload: false,
        })
        history.push('/')
      })
      .catch((e) => {
        setIsLoading(false)
        appDispatch({
          type: SET_ERROR,
          payload: String(e),
        })
      })
  }

  const register = async (registerData: RegisterData) => {
    setIsLoading(true)
    post('/auth/register', registerData)
      .then(({ user, token }) => {
        setIsLoading(false)
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(token))
        userDispatch({
          type: SET_USER,
          payload: user,
        })
        appDispatch({
          type: SET_IS_MODAL_OPENED,
          payload: false,
        })
        history.push('/')
        appDispatch({
          type: SET_SUCCESS,
          payload: 'Vous allez recevoir un email d\'activation. Après avoir activé votre compte vous pourrez pleinement profiter de l\'expérience Drawmadaire',
        })
      })
      .catch((e) => {
        setIsLoading(false)
        appDispatch({
          type: SET_ERROR,
          payload: String(e),
        })
      })
  }

  const update = async (updateData: UpdateData) => {
    setIsLoading(true)
    console.log(updateData)
    post('/auth/update', updateData)
      .then(({ user }) => {
        setIsLoading(false)
        userDispatch({
          type: SET_USER,
          payload: user,
        })
        history.push('/')
        appDispatch({
          type: SET_SUCCESS,
          payload: 'Vos informations ont bien été mises à jour !',
        })
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e)
        /* appDispatch({
          type: SET_ERROR,
          payload: String(e),
        }) */
      })
  }

  return {
    login,
    register,
    update,
    isLoading,
  };
}
