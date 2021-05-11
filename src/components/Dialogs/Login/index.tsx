import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Login from '../../../pages/Login/Login';
import ResetPassword from '../../../pages/PasswordReset/RequestPasswordReset';
import Register from '../../../pages/Register/Register';
import Link from '@material-ui/core/Link';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import RegisterSuccess from '../../../pages/Register/RegisterSuccess';
import RequestPasswordResetSuccess from '../../../pages/PasswordReset/RequestPasswordResetSuccess';
import { RegisterFormValues } from '../../../types/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ErrorNames } from '../../../types/error';
import NotVerified from '../../../pages/Register/NotVerified';
import { ActionStatus } from '../../../types/main';
import loginDialogStyles from './loginDialogStyles';

interface Props {
    location?: any
}

enum LoginDialogState {
    Login,
    Register,
    ResetPassword,
    RegisterSuccess,
    ResetPasswordSuccess,
    NotVerified
}

const LoginDialog = (props: Props) => {
    const [content, setContent] = useState<LoginDialogState>(LoginDialogState.Login);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = loginDialogStyles();
    const history = useHistory();
    const authState = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation();
    const handleClose = () => {
        history.push('/');
    };

    useEffect(() => {        
        if (authState.status === ActionStatus.Failure && authState.error === ErrorNames.UserNotVerified) {
            setContent(LoginDialogState.NotVerified)
        }
    }, [authState])

    const renderContent = (dialogState: LoginDialogState) => {
        switch (dialogState) {
            case LoginDialogState.Login:
                return <Login resetPasswordCallback={() => { setContent(LoginDialogState.ResetPassword) }} />
            case LoginDialogState.Register:
                return <Register onSuccessCallback={
                    (values: RegisterFormValues) => {
                        setContent(LoginDialogState.RegisterSuccess);
                    }
                }
                />
            case LoginDialogState.ResetPassword:
                return <ResetPassword onSuccessCallback={() => { setContent(LoginDialogState.ResetPasswordSuccess) }} />
            case LoginDialogState.RegisterSuccess:
                return <RegisterSuccess />
            case LoginDialogState.NotVerified:
                return <NotVerified />
            case LoginDialogState.ResetPasswordSuccess:
                return <RequestPasswordResetSuccess onSuccessCallback={() => { setContent(LoginDialogState.Login) }} />
            default:
                break;
        }
    }

    const renderLinks = (dialogState: LoginDialogState) => {
        switch (dialogState) {
            case LoginDialogState.Login:
                return (
                    <div>
                        {t("Don't have an Account yet?")}
                        <span> </span>
                        <Link href="" onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setContent(LoginDialogState.Register)
                        }}>
                            {t("Register_verb")}
                        </Link>
                    </div>
                )
            default:
                return (
                    <div>
                        {t("Already have an Account?")}
                        <span> </span>
                        <Link href="" onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setContent(LoginDialogState.Login)
                        }}>
                            {t("Login_verb")}
                        </Link>
                    </div>
                )
        }
    }

    return (
        <div>
            <Dialog
                maxWidth={false}
                fullScreen={fullScreen}
                open={true}
                onClose={handleClose}
                classes={{
                    paper:
                        classes.paper
                }}
            >
                <div className={classes.content}>
                    <div className={classes.leftPart}>
                        <div className='reg-title'>{t('registration-dialog-title')}</div>
                        <div className='reg-body'>{t('registration-dialog-body')}</div>
                    </div>
                    <div className={classes.mainPart}>

                        <div className={classes.mainContent}>
                            {renderContent(content)}
                        </div>
                        <div className={classes.footer}>
                            {renderLinks(content)}
                        </div>

                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default LoginDialog;