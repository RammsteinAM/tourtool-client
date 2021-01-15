import React from 'react'
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook'; 
import facebookButtonStyles from './facebookButtonStyles';
import { useTranslation } from "react-i18next";

interface Props {
  onClick: Function
}

const FacebookButton = (props: Props) => {
  const classes = facebookButtonStyles();  
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<FacebookIcon />}
      onClick={() => props.onClick()}
    >
      {t('Facebook Login')}
    </Button>
  )
}

export default FacebookButton