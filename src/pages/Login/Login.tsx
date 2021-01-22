import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, Link } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions'
import loginStyles from './loginStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookButton from '../../components/Buttons/FacebookLogin/FacebookButton';
import GoogleButton from '../../components/Buttons/GoogleLogin/GoogleButton';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { appName } from '../../utils/constants';
import mainStyles from '../../styles/mainStyles';
import { useSnackbar } from 'notistack';

interface FormikValues {
    email: string;
    password: string;
}

interface IError {
    email?: string;
    password?: string;
}

interface Props {
    resetPasswordCallback: () => void
}

const Login = (props: Props) => {
    const classes = loginStyles();
    const mainClasses = mainStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const authState = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(authState.status === ActionStatus.Request);
    }, [authState.status]);

    const handleFormSubmit = (values: FormikValues): void => {
        dispatch(authActions.login(values));
        setSubmitting(true);
    }

    const showSnackbars = (errors: IError): void => {
        if (errors.email) enqueueSnackbar(errors.email, {variant: "error"});
        if (errors.password) enqueueSnackbar(errors.password, {variant: "error"});
    }

    const handleForgotPassword = (e: React.MouseEvent): void => {
        e.preventDefault();
        props.resetPasswordCallback();
    }

    const responseGoogle = (response: any) => {
        debugger
        dispatch(authActions.googleLogin(response.tokenId));
    }

    const responseGoogleFailure = (response: any) => {
        enqueueSnackbar(`${t('Google Login Error:')} ${response?.details}`, {variant: "error"});
    }

    const responseFacebook = (response: any) => {
        dispatch(authActions.facebookLogin(response));

    }

    return (
        <>
            <CssBaseline />
            <Typography>
                {t("Login to app", { appName })}
            </Typography>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors: IError = {};
                    if (!values.email) {
                        errors.email = t('Email is required');
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = t('Invalid Email Address');
                    }
                    if (!values.password) {
                        errors.email = t('Please enter the Password');
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
                            error={!!errors.email && touched.email}
                            size="small"
                            required
                            fullWidth
                            id="email"
                            label={t('Email')}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                        />
                        <div className={mainClasses.formErrorContainer}>
                            {errors.email && touched.email &&
                                <ErrorMessage name="email" component="div" className={mainClasses.formError} />}
                        </div>
                        <TextField
                            error={!!errors.password && touched.password}
                            required
                            fullWidth
                            name="password"
                            label={t('Password')}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                        />
                        <div className={classes.forgotPasswordLink}>
                            <Link href="" onClick={handleForgotPassword}>
                                {t("Forgot Password?")}
                            </Link>
                        </div>
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={submitting}
                            className={classes.button}
                            onClick={() => showSnackbars(errors)}
                        >
                            {t('Login')}
                        </Button>
                        <GoogleLogin
                            clientId="689539234040-ul5se7j4rnm8s7mkf04bn51suq67p1hg.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogleFailure}
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
                                { width: "200px", textTransform: "none" }
                            }
                            callback={responseFacebook}
                            render={(renderProps) => (
                                <FacebookButton onClick={renderProps.onClick} />
                            )}
                        />
                        {authState.status === ActionStatus.Request &&
                            <div className={classes.progress}>
                                <CircularProgress />
                            </div>
                        }
                        {authState.status === ActionStatus.Failure &&
                            <div className="form-error">{authState.error}</div>
                        }
                    </form>
                )}
            </Formik>
        </>
    );
}

export default Login;