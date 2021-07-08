import React, { ReactNode } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Game from '../../Game';
import Home from '../../Home';
import UserProvider from '../../../contexts/UserProvider';
import GameProvider from '../../../contexts/GameProvider';
import Profile from '../../Profile';
import { ResetPassword } from '../../Auth';
import Modal from '../Modal'
import Results from '../../Game/Results';
import Register from '../../Auth/Register'
import Edit from '../../Profile/Edit/Edit'

interface Props {
  children?: ReactNode | ReactNode[]
}

const Router = ({ children }: Props) => (
  <BrowserRouter>
    {children}
    <UserProvider>
      <GameProvider>
        <Switch>
          <Route path="/profile/edit">
            <Edit />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/game/:roomId">
            <Game />
          </Route>
          <Route exact path="/game/:roomId/results">
            <Results />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route path="/reset-password/:id">
            <ResetPassword />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Modal />
      </GameProvider>
    </UserProvider>
  </BrowserRouter>
)

export default Router
