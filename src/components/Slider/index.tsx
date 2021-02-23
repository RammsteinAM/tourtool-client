import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const HeaderSlider = withStyles({
    root: {
      color: '#8ebd5e',
      height: 8,
      width: '128px',
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
    // valueLabel: {
    //   left: 'calc(-50% + 4px)',
    // },
    // track: {
    //   height: 8,
    //   borderRadius: 4,
    // },
    rail: {
    //   height: 8,
    //   borderRadius: 4,
      backgroundColor: '#000',
    },
  })(Slider);