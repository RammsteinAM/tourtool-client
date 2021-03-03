import React, { useEffect, useState, FC, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../../redux/register/actions'
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { appName } from '../../utils/constants';
import mainStyles from '../../styles/mainStyles';
import { RegisterFormValues } from '../../types/user';
import { userServices } from '../../services/user';
import { ErrorNames } from '../../types/error';
import { debounce } from 'lodash';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';
import registerStyles from './registerStyles';

interface IError {
    email?: string;
    password?: string;
}

type EmailInUse = 'yes' | 'no' | 'loading'

interface Props {
    onSuccessCallback: (values: RegisterFormValues) => void;
}

const Register = (props: Props) => {
    const classes = registerStyles();
    const mainClasses = mainStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
    const [emailInUse, setEmailInUse] = useState<boolean>(false);
    const [emailInUseLoading, setEmailInUseLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<RegisterFormValues>();
    const registerState = useSelector((state: RootState) => state.register);
    //const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(registerState.status === ActionStatus.Request);
        if (registerState.status === ActionStatus.Success && formValues) {
            props.onSuccessCallback(formValues); // TODO
        }
    }, [registerState.status]);

    const handleFormSubmit = (values: RegisterFormValues): void => {
        setFormValues(values);
        dispatch(registerActions.register(values));
        setSubmitting(true);
    }

    const checkEmailInUse = (email: string) => {
        userServices.emailCheck(email)
            .then(() => {
                setEmailInUse(false)
            })
            .catch(() => {
                setEmailInUse(true)
            })
            .finally(() => {
                setEmailInUseLoading(false)
            })
    }

    const delayedCheckEmailInUse = useCallback(debounce(email => checkEmailInUse(email), 500), [emailInUse]);

    const handleEmailChange = (formikCallback: (e: React.ChangeEvent<any>) => void, e: React.ChangeEvent<{ value: string }>) => {
        const email = e.target.value;
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setEmailInUseLoading(true);
            setEmailIsValid(true);
            delayedCheckEmailInUse(email);
        }
        else {
            setEmailIsValid(false)
        }
        formikCallback(e);
    }

    return (
        <>
            <CssBaseline />
            <Typography>
                {t("Register for", { appName })}
            </Typography>
            <Formik
                initialValues={{ email: '', password: '', displayName: '' }}
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
                        errors.password = t('Please enter the Password');
                    } else if (
                        !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/.test(values.password)
                    ) {
                        errors.password = t('password-validation-error');
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
                            size="small"
                            fullWidth
                            id="displayName"
                            label={t('Display Name')}
                            name="displayName"
                            autoComplete="displayName"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                        />
                        <div className={mainClasses.formErrorContainer}>
                            {errors.displayName && touched.displayName &&
                                <ErrorMessage name="displayName" component="div" className={mainClasses.formError} />
                            }
                        </div>
                        <TextField
                            error={!!errors.email && touched.email}
                            size="small"
                            required
                            fullWidth
                            id="email"
                            label={t('Email')}
                            name="email"
                            autoComplete="email"
                            InputProps={{
                                endAdornment: emailIsValid && (
                                    <InputAdornment position="end">
                                        {emailInUseLoading ? <CircularProgress size={20} /> :
                                            (
                                                emailInUse ?
                                                    <Tooltip title={`${t(`ERROR_${ErrorNames.EmailInUse}`)}`}>
                                                        <ErrorIcon style={{ color: 'red', fontSize: '22px', cursor: 'default' }} />
                                                    </Tooltip> :
                                                    <CheckCircleIcon style={{ color: 'green', fontSize: '22px' }} />
                                            )
                                        }
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e: React.ChangeEvent<any>) => handleEmailChange(handleChange, e)}
                            onBlur={handleBlur}
                            className={classes.textField}
                        />
                        <div className={mainClasses.formErrorContainer}>
                            {errors.email && touched.email &&
                                <ErrorMessage name="email" component="div" className={mainClasses.formError} />
                            }
                            {/* {emailInUseLoading ? <div className={mainClasses.formError}>Loading</div> :
                                (
                                    emailInUse ? <div className={mainClasses.formError}>{t(`ERROR_${ErrorNames.EmailInUse}`)}</div> : <div>OK</div>

                                )
                            } */}
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
                        <div className={mainClasses.formErrorContainer}>
                            {errors.password && touched.password &&
                                <ErrorMessage name="password" component="div" className={mainClasses.formError} />
                            }
                        </div>
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={submitting}
                            className={classes.button}
                        >
                            {t('Register')}
                        </Button>
                        {registerState.status === ActionStatus.Request &&
                            <div className={mainClasses.progress}>
                                <CircularProgress />
                            </div>
                        }
                        {/* {registerState.status === ActionStatus.Failure &&
                            <div className={mainClasses.errorMessage}>
                                {t(`ERROR_${registerState.error}`)}
                                </div>
                        } */}
                    </form>
                )}
            </Formik>
        </>
    );
}

export default Register;