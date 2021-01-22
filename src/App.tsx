import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import Layout from './components/Layout';
import PublicRoute from './components/Routes/PublicRoute';
import LoginDialog from './components/Dialogs/Login';
import ResetPasswordForm from './pages/PasswordReset/PasswordResetForm';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/tournaments" />
          </Route>
          {/* <PrivateRoute exact path="/">
            <Tournaments />
          </PrivateRoute> */}
          <PrivateRoute exact path="/tournaments/">
            <div></div>
            {/* <Tournaments /> */}
          </PrivateRoute>
          {/* <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute> */}
          <PublicRoute exact path="/login">
            <LoginDialog />
          </PublicRoute>
          <PublicRoute exact path="/reset-password">
            <ResetPasswordForm />
          </PublicRoute>
          <Route path="/">
            <Redirect to="/tournaments" />
          </Route>
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
