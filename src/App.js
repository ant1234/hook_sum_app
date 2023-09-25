import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import { AuthContext } from './context/auth-context';
import Auth from './components/Auth';

const App = props => {
  const AuthCtx = useContext(AuthContext);
  const IngredientsAuth = AuthCtx.isAuth ? <Ingredients /> : <Auth />;
  return (IngredientsAuth);
};

export default App;
