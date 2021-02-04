import React, { useState } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getDescriptionHeight } from '../../utils/styleUtils';
import useStyles from './styles';

interface Props {
    title: string;
    width: number;
    text?: string;
}

const FormSubheader = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const classes = useStyles();

    const handleOpenChange = () => {
        setIsOpen(!isOpen);
    }

    if (!props.text) {
        return (
            <div className={classes.formSubheader}>
                <div className={classes.formSubheaderTitle}>
                    {props.title}
                </div>
            </div>
        )
    }

    return (
        <div
            className={classes.formSubheader}
            style={isOpen ? { height: `${getDescriptionHeight(props.text, props.width)}px` } : {}}
        >
            <div className={classes.formSubheaderTitle}>
                <div>{props.title}</div>
                <IconButton
                    className={clsx(classes.subheaderExpand, {
                        [classes.subheaderExpandOpen]: isOpen,
                    })}
                    onClick={handleOpenChange}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            {
                <div className={classes.formSubheaderText}>
                    {props.text}
                </div>
            }
        </div>
    )
}

export default FormSubheader
