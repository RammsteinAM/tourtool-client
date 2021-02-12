import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import resetPasswordStyles from './passwordResetStyles';
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions'
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import mainStyles from '../../styles/mainStyles';

interface FormikValues {
    password: string;
    confirmPassword: string;
}

interface IError {
    password?: string;
    confirmPassword?: string;
}

const PasswordResetForm = () => {
    const [success, setSuccess] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const classes = resetPasswordStyles();
    const mainClasses = mainStyles();
    const { token } = useParams<{ token: string }>();
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(authState.resetPassword.status === ActionStatus.Request);
        if (authState.resetPassword.status === ActionStatus.Success) {
            setSuccess(true);
        }
    }, [authState.resetPassword.status]);

    const handleFormSubmit = (values: FormikValues): void => {
        dispatch(authActions.resetPassword({ password: values.password, token }));
        setSubmitting(true);
    }

    const handleLoginPageButton = () => {
        history.push('/');
    }

    return (
        <Dialog
            maxWidth={false}
            fullScreen={fullScreen}
            open
            classes={{
                paper:
                    classes.paper
            }}
        >
            <div className={classes.content}>
                <div className={classes.leftPart}>
                    (Lorem Ipsum)
                        </div>
                <div className={classes.mainPart}>

                    <div className={classes.mainContent}>
                        {!success ?
                            <>
                                <Typography>
                                    {t('Please enter a new Password')}
                                </Typography>
                                <Formik
                                    initialValues={{ password: '', confirmPassword: '' }}
                                    validate={values => {
                                        const errors: IError = {};
                                        if (!values.password) {
                                            errors.password = t('Please enter a Password');
                                        } else if (
                                            !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/.test(values.password)
                                        ) {
                                            errors.password = t('password-validation-error');
                                        } else if (values.password !== values.confirmPassword) {
                                            errors.confirmPassword = t('Passwords do not match');
                                        }
                                        if (!values.confirmPassword) {
                                            errors.confirmPassword = t('Please confirm the Password');
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
                                                error={!!errors.password && touched.password}
                                                required
                                                fullWidth
                                                name="password"
                                                label={t('Password')}
                                                type="password"
                                                id="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={classes.textField}
                                            />
                                            <div className={mainClasses.formErrorContainer}>
                                                {errors.password && touched.password &&
                                                    <ErrorMessage name="password" component="div" className={mainClasses.formError} />}
                                            </div>
                                            <TextField
                                                error={!!errors.confirmPassword && touched.confirmPassword}
                                                required
                                                fullWidth
                                                name="confirmPassword"
                                                label={t('Confirm Password')}
                                                type="password"
                                                id="confirmPassword"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={classes.textField}
                                            />
                                            <div className={mainClasses.formErrorContainer}>
                                                {errors.confirmPassword && touched.confirmPassword &&
                                                    <ErrorMessage name="confirmPassword" component="div" className={mainClasses.formError} />}
                                            </div>
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
                                            {authState.resetPassword.status === ActionStatus.Request &&
                                                <div className={mainClasses.progress}>
                                                    <CircularProgress />
                                                </div>
                                            }
                                            {authState.resetPassword.status === ActionStatus.Failure &&
                                                <div className={mainClasses.errorMessage}>
                                                    {t(`ERROR_${authState.resetPassword.error}`)}
                                                </div>
                                            }
                                        </form>
                                    )}
                                </Formik>
                            </> :
                            <>
                                <Typography>
                                    {t("Your password was successfully reset")}
                                </Typography>
                                <div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        disabled={submitting}
                                        className={classes.button}
                                        onClick={handleLoginPageButton}
                                    >
                                        {t('Go to Login Page')}
                                    </Button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default PasswordResetForm;