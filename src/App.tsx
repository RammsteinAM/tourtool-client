import React, { useEffect, useState } from 'react';
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
import EliminationBracket from './pages/Tournaments/EliminationBracket';
import DeleteAccountResult from './pages/DeleteAccount/DeleteAccountResult';
import Elimination from './pages/Tournaments/Elimination';
import LastManStanding from './pages/Tournaments/LastManStanding';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { userServices } from './services/user';
import toast from './components/IndependentSnackbar';
import i18n from "./utils/i18n";
import { HttpError } from './utils/error';
import TournamentResult from './components/Tournament/EliminationResult';
import WatchTournament from './pages/Tournaments/WatchTournament';
import { DisconnectedActionStatus } from './redux/auth/types';

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 403 || err.response.data.error === 'InvalidTokenError') {
    const refreshToken = localStorage.getItem('refreshToken');
    refreshToken && userServices.loginCheck({ refreshToken }).then(res => {
      const cookies = new Cookies();
      if (res?.data?.data?.accessToken) {
        cookies.set('x-auth-token', res?.data?.data!.accessToken, { path: '/' });
        toast.warning(i18n.t('interceptor-success-message'));
      }
    })
  }
  else {
    const resData = err?.response?.data;
    toast.error(i18n.t(`ERROR_${resData?.error}`));
    throw err
  }
});

const App = () => {
  const [disconnected, setDisconnected] = useState<boolean>(false)
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authState.status === ActionStatus.Initial || authState.status === DisconnectedActionStatus.Disconnected) {
      dispatch(authActions.loginCheck());
    }
  }, [])

  useEffect(() => {
    if (authState.status !== ActionStatus.Success) {
      return;
    }
    const interval = setInterval(() => {
      dispatch(authActions.checkOrGetAccessToken());
    }, 120000);

    return () => {
      clearInterval(interval);
    }
  }, [authState.status])

  useEffect(() => {
    if (authState.status !== DisconnectedActionStatus.Disconnected) {
      return;
    }
    const interval = setInterval(() => {
        dispatch(authActions.checkOrGetAccessToken());
    }, 10000);

    return () => {
      clearInterval(interval);
    }
  }, [authState.status])

  useEffect(() => {  
    const dc = authState.status === DisconnectedActionStatus.Disconnected  ;
    if (dc !== disconnected) {
      setDisconnected(dc)
    }
  }, [authState.status])

  return (
    <BrowserRouter>
      <Layout disconnected={disconnected}>
        <Switch>
          <PrivateRoute exact path="/tournament/new">
            <TournamentTypeSelect />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament/elimination-bracket">
            <EliminationBracket />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament-form/:tournamentType">
            <TournamentForm />
          </PrivateRoute>
          <PrivateRoute exact path="/elimination/:tournamentId">
            <Elimination />
          </PrivateRoute>
          <PrivateRoute exact path="/lms/:tournamentId">
            <LastManStanding />
          </PrivateRoute>
          <PrivateRoute exact path="/elimination/:tournamentId/result">
            <TournamentResult />
          </PrivateRoute>
          <PrivateRoute exact path="/lms/:tournamentId/result">
            <TournamentResult />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament/player-type-select/:tournamentType">
            <PlayerTypeSelect />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament/player-form/:tournamentType/:playerType/:config?">
            <PlayerForm />
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
          <Route exact path="/delete-account/:token">
            <DeleteAccountResult />
          </Route>
          <Route exact path="/watch/:tournamentShareId">
            <WatchTournament />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
