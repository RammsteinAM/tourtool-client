import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import loginDialogStyles from './loginDialogStyles';
import Login from '../../../pages/Login/Login';
import ResetPassword from '../../../pages/PasswordReset/RequestPasswordReset';
import Register from '../../../pages/Register/Register';
import Link from '@material-ui/core/Link';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import RegisterSuccess from '../../../pages/Register/RegisterSuccess';
import ResetPasswordForm from '../../../pages/PasswordReset/PasswordResetForm';
import { RegisterFormValues } from '../../../types/user';

interface Props {
    //children: ReactElement
}

enum LoginDialogState {
    Login,
    Register,
    ResetPassword,
    RegisterSuccess,
    ResetPasswordSuccess
}

const LoginDialog = (props: Props) => {
    const [open, setOpen] = useState(true);
    const [content, setContent] = useState<LoginDialogState>(LoginDialogState.Login);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = loginDialogStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        //setOpen(false);
        history.push('/');
    };

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
                return //<RegisterSuccess />
            case LoginDialogState.ResetPasswordSuccess:
            // return <ResetPasswordSuccess />
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open responsive dialog
            </Button>
            <Dialog
                maxWidth={false}
                fullScreen={fullScreen}
                open={true}
                onClose={handleClose}
                //className={classes.root}
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
                            {renderContent(content)}
                        </div>
                        <div className={classes.footer}>
                            {renderLinks(content)}
                        </div>

                    </div>
                </div>
                {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
            </Dialog>
        </div>
    );
}

export default LoginDialog;