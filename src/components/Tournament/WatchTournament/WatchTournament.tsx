import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { endpoint } from '../../../config';
import WatchEliminationTournament from './WatchEliminationTournament';
import WatchLMSTournament from './WatchLMSTournament';
import KEKW from '../../resources/icons/KEKW.png';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { setWatchTournamentData } from '../../../redux/watchTournament/actions';
import { RootState } from '../../../redux/store';
import { CircularProgress } from '@material-ui/core'
import clsx from 'clsx';
import mainStyles from '../../../styles/mainStyles';


const WatchTournament = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { tournamentShareId } = useParams<{ tournamentShareId: string }>();
    const data = useSelector((state: RootState) => state.watchTournament.data.tournamentData);
    const dispatch = useDispatch();
    const socket = io(endpoint);
    const { t } = useTranslation();
    const mainClasses = mainStyles();

    useEffect(() => {
        setDataFromSocket();
        socket.on(tournamentShareId, (data) => {
            emitDataFromSocket()
        })
        socket.emit('VIEW_TOURNAMENT', tournamentShareId)
    }, [])

    const emitDataFromSocket = () => {
        socket.emit('VIEW_TOURNAMENT', tournamentShareId)
    }

    const setDataFromSocket = () => {
        socket.on('VIEW_TOURNAMENT', (fetchedData) => {
            dispatch(setWatchTournamentData(fetchedData))
            loading && setLoading(false);
        })
    }

    if (loading) {
        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div className={clsx(mainClasses.centerScreen, mainClasses.progress)}>
                    <CircularProgress />
                </div>
            </div>
        )
    }
    if (data && data.tournamentTypeId === 1) {
        return <WatchEliminationTournament data={data} />
    }
    if (data && data.tournamentTypeId === 2) {
        return <WatchLMSTournament data={data} />
    }
    // if (data && data.tournamentTypeId === 3) {
    //     return <WatchRoundRobinTournament data={data} />
    // }

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 120px)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: 22 }}>{t('There is nothing here')}</div>
            {/* <img style={{ width: '150px', height: '150px' }} src={KEKW} /> */}
        </div>
    );
}

export default WatchTournament
