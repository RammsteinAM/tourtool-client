import React, { ReactElement } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Header from './Headers';
import layoutStyles from './layoutStyles';

interface Props {
    children: ReactElement,
    menuOpen: boolean,
    backdropVisible: boolean,
    backdropCallback: (e: React.MouseEvent) => void,
}

const Main = (props: Props) => {
    const classes = layoutStyles();
    return (
        <>
            <Header menuOpen={props.menuOpen} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
            <Backdrop open={props.backdropVisible} onClick={props.backdropCallback} className={classes.backdrop} />
        </>
    )
}

export default Main