import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions'
import resetPasswordStyles from './passwordResetStyles';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

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
        return () => {
            dispatch(authActions.forgotPasswordReset())
        }
    })

    return (
        <>
            <Typography>
                {t("Check your Email")}
            </Typography>
            <div>
                <p>
                    {t("password-reset-success-body")}
                </p>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    disabled={submitting}
                    className={classes.button}
                    onClick={() => props.onSuccessCallback()}
                >
                    {t('Go to Login Page')}
                </Button>
            </div>
        </>
    );
}

export default RequestPasswordResetSuccess;