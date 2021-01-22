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
import { authActions } from '../../redux/auth/actions';
import registerStyles from './registerStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { appName } from '../../utils/constants';
import AuthDialog from '../../components/Dialogs/Login';
import mainStyles from '../../styles/mainStyles';
import { useSnackbar } from 'notistack';
import { registerActions } from '../../redux/register/actions';

interface FormikValues {
    email: string;
    password: string;
}

interface IError {
    email?: string;
    password?: string;
}

interface Props {
    resetPasswordCallback: () => void;

}

const RegisterSuccess = (props: Props) => {
    const classes = registerStyles();
    const mainClasses = mainStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const authState = useSelector((state: RootState) => state.auth);
    const registerState = useSelector((state: RootState) => state.register);
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
        if (errors.email) enqueueSnackbar(errors.email, { variant: "error" });
        if (errors.password) enqueueSnackbar(errors.password, { variant: "error" });
    }

    const handleResendEmail = (e: React.MouseEvent): void => {
        //e.preventDefault();
        dispatch(registerActions.resendVerificationEmail(registerState.registrationData));
    }

    return (
        <>
            <CssBaseline />
            <Typography>
                {t("Registration success")}
            </Typography>
            <div>
                {t("registration-success-body")}
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    disabled={submitting}
                    className={classes.button}
                    onClick={handleResendEmail}
                >
                    {t('Resend Verification Email')}
                </Button>
            </div>
        </>
    );
}

export default RegisterSuccess;