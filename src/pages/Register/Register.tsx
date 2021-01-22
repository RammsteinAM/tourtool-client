import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../../redux/register/actions'
import registerStyles from './registerStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { appName } from '../../utils/constants';
import { useSnackbar } from 'notistack';
import mainStyles from '../../styles/mainStyles';
import { RegisterFormValues } from '../../types/user';

interface IError {
    email?: string;
    password?: string;
}

interface Props {
    onSuccessCallback: (values: RegisterFormValues) => void;
}

const Register = (props: Props) => {
    const classes = registerStyles();
    const mainClasses = mainStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<RegisterFormValues>();
    const register = useSelector((state: RootState) => state.register);
    //const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    useEffect(() => {
        setSubmitting(register.status === ActionStatus.Request);
        if (register.status === ActionStatus.Success && formValues) {
            props.onSuccessCallback(formValues);
        }
    }, [register.status]);

    const handleFormSubmit = (values: RegisterFormValues): void => {
        setFormValues(values);
        dispatch(registerActions.register(values));
        setSubmitting(true);
    }

    const showSnackbars = (errors: IError): void => {
        if (errors.email) enqueueSnackbar(errors.email, { variant: "error" });
        if (errors.password) enqueueSnackbar(errors.password, { variant: "error" });
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

                        errors.email = t('Invalid Email address');
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
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={classes.textField}
                        />
                        <div className={mainClasses.formErrorContainer}>
                            {errors.email && touched.email &&
                                <ErrorMessage name="email" component="div" className={mainClasses.formError} />
                            }
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
                            onClick={() => showSnackbars(errors)}
                        >
                            {t('Register')}
                        </Button>
                        {register.status === ActionStatus.Request &&
                            <div className={classes.progress}>
                                <CircularProgress />
                            </div>
                        }
                        {register.status === ActionStatus.Failure &&
                            <div className="form-error">{register.error}</div>
                        }
                    </form>
                )}
            </Formik>
        </>
    );
}

export default Register;