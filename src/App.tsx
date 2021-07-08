import React from 'react'
import './App.scss';
import Router from './components/common/Router';
import AppProvider from './contexts/AppProvider';
import FlashMessage from './components/common/FlashMessage';

const App = () => (
  <AppProvider>
    <Router />
    <FlashMessage />
  </AppProvider>
);

export default App;
