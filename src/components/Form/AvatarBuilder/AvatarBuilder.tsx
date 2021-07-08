import React, { ChangeEvent, useContext } from 'react'
import './AvatarBuilder.scss';
import { UserContext } from '../../../contexts/UserProvider';
import { User } from '../../../models/UserModel';
import {
  Action, SET_AVATAR_COLOR, SET_AVATAR_HEAD, SET_AVATAR_MOUTH,
} from '../../../reducers/UserReducer';
import AccessorySwitcher from './AccessorySwitcher';
import { AVATAR_HEADS, AVATAR_MOUTHS } from '../../../models/AvatarModel';
import { Avatar } from '../../common/Avatar';

interface Props {}

const AvatarBuilder: React.FC<Props> = () => {
  const [state, dispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext);

  const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_AVATAR_COLOR,
      payload: event.target.value,
    })
  }

  return (
    <div className="avatar-builder">
      <div className="avatar-switchers">
        <Avatar
          size={150}
          color={state.avatar.color}
          head={state.avatar.head}
          mouth={state.avatar.mouth}
        />

        <div className="switcher head-switcher">
          <AccessorySwitcher
            icons={Object.values(AVATAR_HEADS)}
            onChange={(icon) => {
              dispatch({
                type: SET_AVATAR_HEAD,
                payload: icon,
              })
            }}
          />
        </div>
        <div className="switcher mouth-switcher">
          <AccessorySwitcher
            icons={Object.values(AVATAR_MOUTHS)}
            onChange={(icon) => dispatch({
              type: SET_AVATAR_MOUTH,
              payload: icon,
            })}
          />
        </div>
      </div>

      <input
        type="color"
        value={state.avatar.color}
        onChange={onColorChange}
      />
    </div>
  )
}

export default AvatarBuilder;
