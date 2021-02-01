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
            <div>KEKW</div>
            {/* <Tournaments /> */}
          </PrivateRoute>
          <PrivateRoute exact path="/tournaments/">
            <div>KEKW</div>
            {/* <Tournaments /> */}
          </PrivateRoute>
          {/* <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute> */}

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
