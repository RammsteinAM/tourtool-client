import React from 'react'
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook'; 
import googleButtonStyles from './googleButtonStyles';
import GoogleLogo from './GoogleLogo';
import { useTranslation } from "react-i18next";

interface Props {
  onClick: Function
}

const GoogleButton = (props: Props) => {
  const classes = googleButtonStyles();
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<GoogleLogo />}
      onClick={() => props.onClick()}
    >
      {t('Google Login')}
    </Button>
  )
}

export default GoogleButton