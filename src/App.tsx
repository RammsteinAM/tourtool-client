import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import Layout from './components/Layout';
import PublicRoute from './components/Routes/PublicRoute';
import LoginDialog from './components/Dialogs/Login';
import ResetPasswordForm from './pages/PasswordReset/PasswordResetForm';
import EmailVerificationResult from './pages/Register/EmailVerificationResult';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { authActions } from './redux/auth/actions';
import { ActionStatus } from './types/main';
import TournamentTypeSelect from './pages/Tournaments/TournamentTypeSelect';
import TournamentForm from './pages/Tournaments/TournamentForm';
import PlayerTypeSelect from './pages/Tournaments/PlayerTypeSelect';
import PlayerForm from './pages/Tournaments/PlayerForm';
import Elimination from './pages/Tournaments/EliminationBracket';

function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authState.status === ActionStatus.Initial) {
      dispatch(authActions.loginCheck());
    }
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {/* <PrivateRoute exact path="/">
            <Tournaments />
          </PrivateRoute> */}
          <PrivateRoute exact path="/new/">
            <TournamentTypeSelect />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament-form/:tournamentType">
            <TournamentForm />
          </PrivateRoute>
          <PrivateRoute exact path="/elimination">
            <Elimination />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament-player-type-select/:tournamentType">
            <PlayerTypeSelect />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament-player-form/:playerType">
            <PlayerForm />
          </PrivateRoute>
          <PrivateRoute exact path="/tournaments/">
            <div>KEKW</div>
          </PrivateRoute>
          <PublicRoute exact path="/login">
            <LoginDialog />
          </PublicRoute>
          <PublicRoute exact path="/reset-password/:token">
            <ResetPasswordForm />
          </PublicRoute>
          <PublicRoute exact path="/verify-email/:token">
            <EmailVerificationResult />
          </PublicRoute>
          <Route path="/">
            <Home />
          </Route>
          {/* <Route path="/">
            <Redirect to="/tournaments" />
          </Route> */}
        </Switch>
      </Layout>
    </BrowserRouter>
    // <div className="App">
    //   <LanguageSelect />
    //   <Login />
    // </div>
  );
}

export default App;
