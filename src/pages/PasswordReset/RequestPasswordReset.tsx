import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, Link } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions'
import resetPasswordStyles from './passwordResetStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import mainStyles from '../../styles/mainStyles';
interface IFormikValues {
    email: string;
}

interface IError {
    email?: string;
}

interface Props {
    onSuccessCallback: () => void;
}

const RequestPasswordReset = (props: Props) => {
    const classes = resetPasswordStyles();
    const mainClasses = mainStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const authState = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const { t } = useTranslation();


    useEffect(() => {
        setSubmitting(authState.forgotPassword.status === ActionStatus.Request);
        if (authState.forgotPassword.status === ActionStatus.Success) {
            props.onSuccessCallback();
        }
    }, [authState.forgotPassword.status]);

    const handleFormSubmit = (values: IFormikValues): void => {
        setSubmitting(true);
        dispatch(authActions.forgotPassword({ email: values.email }));
    }

    return (
        <>
            <Typography >
                {t('Request new password')}
            </Typography>
            <Formik
                initialValues={{ email: '' }}
                validate={values => {
                    const errors: IError = {};
                    if (!values.email) {
                        errors.email = t('Email is required');
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = t('Invalid Email Address');
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
                        {errors.email && touched.email &&
                            <ErrorMessage name="email" component="div" className="form-error" />}
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={submitting}
                            className={classes.button}
                        >
                            {t('Confirm')}
                        </Button>
                        {authState.forgotPassword.status === ActionStatus.Request &&
                            <div className={mainClasses.progress}>
                                <CircularProgress />
                            </div>
                        }
                        {/* {authState.forgotPassword.status === ActionStatus.Failure &&
                            <div className={mainClasses.errorMessage}>
                                {t(`ERROR_${authState.forgotPassword.error}`)}
                            </div>
                        } */}
                    </form>
                )}
            </Formik>
        </>
    );
}

export default RequestPasswordReset;