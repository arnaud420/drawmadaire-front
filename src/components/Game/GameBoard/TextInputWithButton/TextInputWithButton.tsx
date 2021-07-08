import React, { useRef, useState } from 'react';
import './TextInputWithButton.scss';

interface Props {
  onValidate: (text: string) => void,
  withMarginTop: boolean,
  disabled?: boolean,
  onChange?: (value: string) => void,
}

const TextInputWithButton: React.FC<Props> = ({
  onValidate, withMarginTop, disabled = false, onChange,
}: Props) => {
  const [value, setValue] = useState('')

  const validate = () => {
    if (value.length) {
      onValidate(value)
    }
  }

  const onValueChange = (inputValue: string) => {
    setValue(inputValue);

    if (onChange) {
      onChange(inputValue)
    }
  }

  return (
    <div className="text-input-with-button" style={withMarginTop ? { marginTop: 20 } : {}}>
      <input
        type="text"
        name="input-field"
        id="input-field"
        value={value}
        onChange={e => onValueChange(e.target.value)}
        placeholder="Ex: Une course de dromadaires"
        disabled={disabled}
      />
      <button
        type="button"
        id="validate-button"
        onClick={validate}
        disabled={disabled}
      >
        Valider
      </button>
    </div>
  );
}

export default TextInputWithButton;
