import React from 'react';
import GlobalStyle from './style/GlobalStyle.js';
import Nav from './Components/Nav';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Favorites from './pages/Favorites';
import { AuthProvider } from './contexts/AuthContext.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import UpdateProfile from './pages/UpdateProfile.js';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <Router>
    <FavoritesProvider>
    <AuthProvider>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/update-profile" component={UpdateProfile} />
        <PrivateRoute exact path="/favorites" component={Favorites} />
      </Switch>
      <GlobalStyle />
    </AuthProvider>
    </FavoritesProvider>
    </Router>
  )
};

export default App;
