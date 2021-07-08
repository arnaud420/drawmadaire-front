import React from 'react';
import './PlayerForm.scss';
import AvatarBuilder from '../AvatarBuilder';
import UsernameInput from '../UsernameInput';

interface Props {}

const PlayerForm: React.FC<Props> = () => (
  <div className="player-form">
    <AvatarBuilder />
    <UsernameInput />
    <p>
      Authentifie toi pour sauver tes données et les retrouver sur n&apos;importe quel appareil
    </p>
  </div>
)

export default PlayerForm;
