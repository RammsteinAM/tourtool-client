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
// axios.interceptors.response.use(
//   function(successRes) {
//     ... modify response; 
//     return successRes;
//   }, 
//   function(error) {
//     ... return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  if (err.response.status === 403 || err.response.data.error === 'InvalidTokenError') {
    const refreshToken = localStorage.getItem('refreshToken');
    refreshToken && userServices.loginCheck({ refreshToken }).then(res => {
      const cookies = new Cookies();
      if (res?.data?.data?.accessToken) {
        cookies.set('x-auth-token', res?.data?.data!.accessToken, { path: '/' });
      }
    })
  }
  else {
    const resData = err?.response?.data;
    toast.error(i18n.t(`ERROR_${resData?.error}`));
    
    throw new HttpError(err?.response?.status, resData?.error, resData?.message);
  }
});

function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {/* <PrivateRoute exact path="/">
            <Tournaments />
          </PrivateRoute> */}
          <PrivateRoute exact path="/tournament/new">
            <TournamentTypeSelect />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament-form/:tournamentType">
            <TournamentForm />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament/elimination-bracket">
            <EliminationBracket />
          </PrivateRoute>
          <PrivateRoute exact path="/elimination">
            <Elimination />
          </PrivateRoute>
          {/* <PrivateRoute exact path="/:tournamentType/:playerType">
            <Elimination />
          </PrivateRoute> */}
          <PrivateRoute exact path="/lms/:playerType">
            <LastManStanding />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament/player-type-select/:tournamentType">
            <PlayerTypeSelect />
          </PrivateRoute>
          <PrivateRoute exact path="/tournament/player-form/:tournamentType/:playerType/:config?">
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
          <PublicRoute exact path="/delete-account/:token">
            <DeleteAccountResult />
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
