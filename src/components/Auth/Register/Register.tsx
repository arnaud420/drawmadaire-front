import React, {
  ChangeEvent,
  FormEvent, useContext, useEffect,
  useState,
} from 'react'
import './Register.scss'
import Button from '../../common/Button';
import { BUTTON_COLOR } from '../../common/Button/Button';
import AvatarBuilder from '../../Form/AvatarBuilder';
import { useAuthentication } from '../../../hooks/useAuthentication'
import { User } from '../../../models/UserModel'
import { Action } from '../../../reducers/UserReducer'
import { UserContext } from '../../../contexts/UserProvider'
import Input from '../../Form/Input';

interface Props {
  switchToLogin?: () => void,
  isEdit?: boolean
}

const Register = ({ switchToLogin, isEdit = false }: Props) => {
  const [errorFields, setErrorFields] = useState<string[]>([])
  const [inputs, setInputs] = useState({
    pseudo: '',
    email: '',
    password: '',
    newPassword: '',
  })
  const { register, update, isLoading } = useAuthentication();
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);

  useEffect(() => {
    if (user && user.email) {
      setInputs({
        ...inputs,
        pseudo: user.pseudo,
        email: user.email,
      })
    }
  }, [user])

  const onChange = (e: ChangeEvent<HTMLInputElement>, input: string) => {
    setInputs({ ...inputs, [input]: e.target.value })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Block form submission
    e.preventDefault()

    const {
      pseudo,
      email,
      password,
      newPassword,
    } = inputs

    if (
      (!isEdit && pseudo.length && email.length && password.length)
      || (isEdit && pseudo.length)
    ) {
      try {
        if (!isEdit) {
          register({
            id: user.id,
            pseudo,
            email,
            password,
            avatar: JSON.stringify(user.avatar),
          })
        } else {
          update({
            id: user.id,
            pseudo,
            password,
            newPassword,
            avatar: JSON.stringify(user.avatar),
          })
        }
      } catch (e) {
        // TODO : handle error on register
      }
    } else {
      // TODO : handle errors
    }

    return false
  }

  const handleFieldError = (input: string, hasError: boolean) => {
    if (hasError && !errorFields.includes(input)) {
      setErrorFields([...errorFields, input])
    } else if (!hasError && errorFields.includes(input)) {
      setErrorFields(errorFields.filter((field) => field !== input))
    }
  }

  return (
    <div id={isEdit ? 'edit-profile-screen' : 'register-screen'}>
      <h3 className="h3-register">{isEdit ? 'Modifier mes informations' : 'Inscription'}</h3>
      <AvatarBuilder />
      <form id={isEdit ? 'form-edit-profile' : 'form-register'} onSubmit={onSubmit}>
        <Input
          type="text"
          value={inputs.pseudo}
          onChange={(e) => onChange(e, 'pseudo')}
          placeholder="Pseudo"
          setHasError={(hasError) => handleFieldError('pseudo', hasError)}
        />
        <Input
          type={isEdit ? 'password' : 'email'}
          value={isEdit ? inputs.password : inputs.email}
          onChange={(e) => onChange(e, isEdit ? 'password' : 'email')}
          placeholder={isEdit ? 'Mot de passe actuel' : 'Email'}
          setHasError={(hasError) => handleFieldError(isEdit ? 'password' : 'email', hasError)}
        />
        <Input
          type="password"
          value={isEdit ? inputs.newPassword : inputs.password}
          onChange={(e) => onChange(e, isEdit ? 'newPassword' : 'password')}
          placeholder={`${isEdit ? 'Nouveau m' : 'M'}ot de passe`}
          setHasError={(hasError) => handleFieldError(isEdit ? 'newPassword' : 'password', hasError)}
        />
        <Button
          type="submit"
          label={isEdit ? 'Valider' : 'S\'inscrire'}
          color={BUTTON_COLOR.BLUE}
          isLoading={isLoading}
          disabled={
            !isEdit && (
              inputs.pseudo.length <= 0
              || inputs.email.length <= 0
              || inputs.password.length <= 0
              || errorFields.length > 0
            )
          }
        />
      </form>
      {!isEdit && (
        <>
          <span>Déjà inscrit ?</span>
          <Button
            label="Se connecter"
            onClick={switchToLogin}
            color={BUTTON_COLOR.BLUE}
          />
        </>
      )}
    </div>
  )
}

export default Register
