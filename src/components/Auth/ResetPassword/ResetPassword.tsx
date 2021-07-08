/* eslint-disable no-throw-literal */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CardContainer from '../../common/CardContainer';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import Button from '../../common/Button';
import { BUTTON_COLOR } from '../../common/Button/Button';
import './ResetPassword.scss';
import { useAPIClient } from '../../../hooks/useAPIClient';

const initialState = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [formMessage, setFormMessage] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { post } = useAPIClient();

  const onInputChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const sendForm = async () => {
    try {
      if (form.password.length < 6 || form.password.length > 20) {
        throw ({
          type: 'password',
          message: 'Le mot de passe doit être compris entre 6 et 20 caractères',
        });
      }

      if (form.password !== form.confirmPassword) {
        throw ({
          type: 'confirmPassword',
          message: 'Les mots de passe doivent être identiques',
        });
      }
      setErrors(initialState);
      setIsLoading(true);
      const data = await post('/auth/reset-password', { ...form, token: id });
      setIsLoading(false);
      setFormMessage({
        type: 'success',
        message: data.message,
      })
      return null;
    } catch (err) {
      setIsLoading(false);
      if (err.type) {
        const newErr = {
          ...initialState,
          [err.type]: err.message,
        };
        return setErrors(newErr);
      }
      setFormMessage({
        type: 'error',
        message: err.message,
      });
    }
    return null;
  }

  return (
    <div>
      <CardContainer className="justify-center">
        <div className="logo">
          <Logo id="logo" width={100} height={100} />
          <h1>Drawmadaire</h1>
        </div>

        <form>
          {
            formMessage
              ? <div className={`form-message ${formMessage.type}`}>{formMessage.message}</div>
              : ''
          }
          <div className="form-control">
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={onInputChange}
              placeholder="Nouveau mot de passe"
              className={errors.password ? 'error' : ''}
            />
            {
              errors.password
                ? <div className="error">{errors.password}</div>
                : null
            }
          </div>

          <div className="form-control">
            <input
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={onInputChange}
              placeholder="Confirmer le mot de passe"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {
              errors.confirmPassword
                ? <div className="error">{errors.confirmPassword}</div>
                : null
            }
          </div>

          <Button
            label="Valider"
            onClick={sendForm}
            color={BUTTON_COLOR.BLUE}
            disabled={isLoading}
          />
        </form>
      </CardContainer>
    </div>
  )
}

export default ResetPassword;
