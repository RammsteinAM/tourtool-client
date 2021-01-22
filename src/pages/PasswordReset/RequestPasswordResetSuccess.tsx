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
import resetPasswordStyles from './passwordResetStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useTranslation } from "react-i18next";
import { forgotPasswordActions } from '../../redux/forgotPassword/actions';
import { useHistory } from "react-router-dom";
interface IFormikValues {
    email: string;
}

interface IError {
    email?: string;
}

interface Props {
    onSuccessCallback: () => void;
}

const RequestPasswordResetSuccess = (props: Props) => {
    const classes = resetPasswordStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const authState = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(authState.forgotPassword?.status === ActionStatus.Request);
        if (authState.forgotPassword?.status === ActionStatus.Success) {
            props.onSuccessCallback();
        }
    }, [authState.forgotPassword?.status]);

    const handleFormSubmit = (values: IFormikValues): void => {
        setSubmitting(true);
        dispatch(authActions.forgotPassword({ email: values.email }));
    }

    return (
        <>
            <Typography>
                {t("Check your Email")}
            </Typography>
            <div>
                {t("password-reset-success-body")}
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    disabled={submitting}
                    className={classes.button}
                    //onClick={handleResendEmail}
                >
                    {t('Resend Verification Email')}
                </Button>
            </div>
        </>
    );
}

export default RequestPasswordResetSuccess;