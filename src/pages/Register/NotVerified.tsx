import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions';
import registerStyles from './registerStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import mainStyles from '../../styles/mainStyles';
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
    //resetPasswordCallback: () => void;
}

const NotVerified = (props: Props) => {
    const classes = registerStyles();
    const mainClasses = mainStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const authState = useSelector((state: RootState) => state.auth);
    const registerState = useSelector((state: RootState) => state.register);
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(authState.status === ActionStatus.Request);
    }, [authState.status]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) setTimeLeft(timeLeft - 1);
        }, 1000);
    });

    const handleFormSubmit = (values: FormikValues): void => {
        dispatch(authActions.login(values));
        setSubmitting(true);
    }

    const handleResendEmail = (e: React.MouseEvent): void => {
        //e.preventDefault();
        if (authState.data?.email && authState.data?.password) {
            dispatch(registerActions.resendVerificationEmail({ email: authState.data?.email, password: authState.data?.password }));
            setTimeLeft(60)
        }            
    }

    return (
        <>
            <CssBaseline />
            <Typography>
                {t("Your account is not verified")}
            </Typography>
            <div>
                {t("not-verified-body")}
                {timeLeft > 0 ?
                    t("not-verified-body-end1", { sec: timeLeft }) :
                    t("not-verified-body-end2")
                }
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    disabled={submitting || timeLeft > 0}
                    className={classes.button}
                    onClick={handleResendEmail}
                >
                    {t('Resend Verification Email')}
                </Button>
            </div>
            {registerState.resendVerificationEmail.status === ActionStatus.Request &&
                <div className={mainClasses.progress}>
                    <CircularProgress />
                </div>
            }
        </>
    );
}

export default NotVerified;