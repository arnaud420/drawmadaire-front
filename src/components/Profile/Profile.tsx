import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../contexts/UserProvider';
import { User } from '../../models/UserModel';
import { Action, LOGOUT_USER } from '../../reducers/UserReducer';
import { Avatar } from '../common/Avatar';
import MainContainer from '../common/MainContainer';
import './Profile.scss';
import Title from './Title';
import withUserLoading from '../../hoc/withUserLoading'
import { LOCAL_STORAGE_TOKEN } from '../../config/localStorage';
import LogoutIcon from '../../assets/img/logout.png';

const Profile = () => {
  const history = useHistory()
  const [user, dispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext)

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    dispatch({ type: LOGOUT_USER })
    history.push('/');
  }

  return (
    <MainContainer arrowBack>
      <div id="profile-container">
        <div className="profile-part-container">
          <Avatar
            color={user.avatar.color}
            mouth={user.avatar.mouth}
            head={user.avatar.head}
            size={100}
          />
        </div>
        <span>{user.pseudo}</span>
        <div className="profile-part-container">
          <Title>Informations personnelles</Title>
          <div id="personnal-data-container">
            <div id="personnal-data">
              <span>{`Pseudo : ${user.pseudo}`}</span>
              <span>{`Email : ${user.email}`}</span>
              <span>Mot de passe : *******</span>
            </div>
            <div id="edit-personnal-data-btn">
              <button type="button" onClick={() => history.push('/profile/edit')}>Modifier</button>
            </div>
          </div>

          <button id="logout" type="button" onClick={logout}>
            Déconnexion
            <img src={LogoutIcon} width="15px" alt="Déconnexion" />
          </button>
        </div>
        <div className="profile-part-container">
          <Title>Statistiques de jeu</Title>
          <div id="stats-container">
            <span>{`Inscrit depuis le : ${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}`}</span>
            <span>{`Nombre de parties jouées : ${user.stats?.games ?? 0}`}</span>
            {/* <div id="stats-badge">
              Badges :
              <br />
              <div id="badges-container">
                <div>
                  <img src={require('../../assets/img/laugh.png').default} alt="Badge icon" />
                  {user.stats?.laughBadges}
                </div>
                <div>
                  <img src={require('../../assets/img/love.png').default} alt="Badge icon" />
                  {user.stats?.loveBadges}
                </div>
                <div>
                  <img src={require('../../assets/img/sick.png').default} alt="Badge icon" />
                  {user.stats?.sickBadges ?? 0}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default withUserLoading(Profile);
