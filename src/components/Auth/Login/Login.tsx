import React, {
  ChangeEvent, FormEvent,
  useState,
} from 'react'
import './Login.scss'
import { BUTTON_COLOR } from '../../common/Button/Button';
import Button from '../../common/Button';
import { useAuthentication } from '../../../hooks/useAuthentication'

interface Props {
  switchToRegister: () => void
}

const Login = ({ switchToRegister }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthentication()

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Block form submission
    e.preventDefault()

    if (email.length && password.length) {
      try {
        login({
          login: email,
          password,
        }).then(() => {
          // TODO : redirect to home
        })
      } catch (e) {
        // TODO : handle error on register
      }
    } else {
      // TODO : handle errors
    }
  };

  return (
    <div id="login-screen">
      <h3>Connexion</h3>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Mot de passe"
        />
        <Button
          label="Se connecter"
          type="submit"
          color={BUTTON_COLOR.BLUE}
          disabled={email.length <= 0 || password.length <= 0}
          isLoading={isLoading}
        />
      </form>
      <p className="color-red">Mot de passe oublié ?</p>
      <p>Pas encore inscrit ?</p>
      <Button
        label="S'inscrire"
        onClick={switchToRegister}
        color={BUTTON_COLOR.BLUE}
      />
    </div>
  )
}

export default Login
