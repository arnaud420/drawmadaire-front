import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react'
import './Input.scss'

interface Props {
  type: string,
  value: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  setHasError: (hasError: boolean) => void,
}

enum ErrorText {
  EMAIL_ERROR = 'L\'email doit être au format email@domaine.com',
  PASSWORD_ERROR = 'Le mot de passe doit comprendre au min 8 caractères, une majuscule, un minuscule et un chiffre'
}

const Input = ({
  type,
  value,
  placeholder,
  onChange,
  setHasError,
}: Props) => {
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    if (error) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }, [error])
  const isValid = () => {
    switch (type) {
      case 'email':
        setError(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/.test(value))
        break
      case 'password':
        setError(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value))
        break
      default:
        break
    }
  }
  return (
    <>
      <input
        type={type}
        className={error ? 'input-error' : ''}
        onBlur={isValid}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <span className="error-info">
          {/* eslint-disable-next-line no-nested-ternary */}
          {type === 'email' ? ErrorText.EMAIL_ERROR : type === 'password' ? ErrorText.PASSWORD_ERROR : ''}
        </span>
      )}
    </>
  )
};

export default Input;
