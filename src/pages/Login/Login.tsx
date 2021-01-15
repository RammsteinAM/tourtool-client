import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CircularProgress, Link } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { adminLogin } from '../../store/features/loginSlice';
// import { RootState } from '../../store';
// import ILoginData, { ActionStatus } from '../../types/auth/ILoginData';
import { authActions } from '../../redux/auth/actions'
import loginStyles from './loginStyles';
import { LoginRequest, UserLoginReqData, UserLoginResData } from '../../types/user';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookButton from '../../components/Buttons/FacebookLogin/FacebookButton';
import GoogleButton from '../../components/Buttons/GoogleLogin/GoogleButton';
import { useTranslation } from "react-i18next";
interface IFormikValues {
    email: string;
    password: string;
}

interface IError {
    email?: string;
}

const Login: FC = () => {
    const classes = loginStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const login: any = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(login.status === ActionStatus.Request);
    }, [login.status]);

    const handleFormSubmit = (values: IFormikValues): void => {
        dispatch(authActions.login(values));
        setSubmitting(true);
    }

    const handleForgotPassword = (): void => {
        dispatch(authActions.forgotPassword(values));
        setSubmitting(true);
    }

    const responseGoogle = (response: any) => {
        dispatch(authActions.googleLogin(response.tokenId));
    }

    const responseFacebook = (response: any) => {
        dispatch(authActions.facebookLogin(response));

    }
    // const fbClicked = (response: any) => {
    //     console.log(response);
    // }

    return (
        <div className={`login-form ${classes.root}`}>
            <Card className={classes.card} variant="outlined">
                <Container component="main" maxWidth="sm" className={`login-form-main ${classes.mainContainer}`}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4">
                            Log in
                        </Typography>
                        <Formik
                            initialValues={{ email: '', password: '', remember: false }}
                            validate={values => {
                                const errors: IError = {};
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={handleFormSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classes.textField}
                                    />
                                    {errors.email && touched.email &&
                                        <ErrorMessage name="email" component="div" className="form-error" />}
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classes.textField}
                                    />
                                    <Link href="#" onClick={handleForgotPassword}>
                                    asfsf
                                    </Link>
                                    {/* <Field
                                            name="remember"
                                            render={({ field, form }: any) => {
                                                return (
                                                    <FormControlLabel
                                                        control={<Checkbox id="remember" value="remember" name="remember" color="primary" checked={field.value} {...field} />}
                                                        label="Remember me"
                                                    />
                                                );
                                            }}
                                        /> */}
                                    <br />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={submitting}
                                        className={classes.button}
                                    >
                                        {t('Login')}
                                    </Button>
                                    <GoogleLogin
                                        clientId="689539234040-ul5se7j4rnm8s7mkf04bn51suq67p1hg.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={(renderProps) => (
                                            <GoogleButton onClick={renderProps.onClick} />
                                        )}
                                    />
                                    <FacebookLogin
                                        appId="1360736550926562"
                                        autoLoad={false}
                                        fields="name,email"
                                        buttonStyle={
                                            { width: "200px", textTransform: "none"}
                                        }
                                        textButton="Facebook Login"
                                    //icon={<FacebookIcon />}
                                        //onClick={fbClicked}
                                        callback={responseFacebook}
                                        render={(renderProps) => (
                                            <FacebookButton onClick={renderProps.onClick} />
                                        )}
                                        //tag={FacebookButton}
                                    />
                                    {login.status === ActionStatus.Request &&
                                        <div className={classes.progress}>
                                            <CircularProgress />
                                        </div>
                                    }
                                    {login.status === ActionStatus.Failure &&
                                        <div className="form-error">{login.error}</div>
                                    }
                                </form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </Card>
        </div>
    );
}

export default Login;