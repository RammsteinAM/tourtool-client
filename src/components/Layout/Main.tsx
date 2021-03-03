import React, { ReactElement } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Header from './Headers';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import layoutStyles from './layoutStyles';

interface Props {
    children: ReactElement,
    menuOpen: boolean,
    backdropVisible: boolean,
    backdropCallback: (e: React.MouseEvent) => void,
    fullScreen?: boolean,
}

const Main = (props: Props) => {
    const classes = layoutStyles();

    const fullScreen = useSelector((state: RootState) => state.settings.fullScreen);

    return (
        <>
            <Header menuOpen={props.menuOpen} />
            <main className={classes.content} style={{ maxWidth: `calc(100% - ${!fullScreen ? '56px' : '0px'})` }}>
                {!props.fullScreen && <div className={classes.toolbar} />}
                {props.children}
            </main>
            <Backdrop open={props.backdropVisible} onClick={props.backdropCallback} className={classes.backdrop} />
        </>
    )
}

export default Main