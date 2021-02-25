import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const HeaderSlider = withStyles({
    root: {
      color: '#8ebd5e',
      width: '128px',
      margin: '0 18px',
    },
    thumb: {
      height: 14,
      width: 14,
      marginTop: -6,
      marginLeft: -8,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
      '&:focus, &$active': {
        marginTop: -8,        
      marginLeft: -12,
        height: 20,
        width: 20,
      },
    },
    active: {},
    rail: {
      backgroundColor: '#000',
    },
  })(Slider);