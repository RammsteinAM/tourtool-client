import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { entityActions } from '../../redux/tournamentEntities/actions';
import HomeCard from '../../components/Tournament/HomeCard';
import { ReactComponent as Logo } from '../../resources/icons/logo.svg';
import homeStyles from './homeStyles';
import { FetchedTournament } from '../../types/entities';
import { tournamentTypeIds } from '../../utils/constants';

interface Props {
}

const Home = (props: Props) => {
    const classes = homeStyles();
    const authState = useSelector((state: RootState) => state.auth);
    const entityState = useSelector((state: RootState) => state.entities);
    const tournamentsSortKey = useSelector((state: RootState) => state.settings.tournamentsSortKey) || 'createdAt';
    const tournamentsSortOrder = useSelector((state: RootState) => state.settings.tournamentsSortOrder) || 1;
    const tournamentsFilterKey = useSelector((state: RootState) => state.settings.tournamentsFilterKey) || 'all';
    const tournamentsSearchKeyword = useSelector((state: RootState) => state.settings.tournamentsSearchKeyword) || '';
    const loggedIn = authState.status === ActionStatus.Success;
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const tournamentsData = entityState.fetchedTournaments?.data && Object.values(entityState.fetchedTournaments.data);

    useEffect(() => {
        if (loggedIn) {
            dispatch(entityActions.getTournaments())
        }
    }, [loggedIn])

    const handleCreateTournament = () => {
        history.push(loggedIn ? '/tournament/new' : '/login');
    }

    const compareFunction = (a: FetchedTournament, b: FetchedTournament) => {
        if (!a || !b) {
            return 0;
        }
        // const pos: number = tournamentsSortOrder;
        // const neg: number = tournamentsSortOrder;
        let result = 0;
        switch (tournamentsSortKey) {
            case 'createdAt':
            case 'updatedAt':
                result = new Date(b[tournamentsSortKey]).getTime() - new Date(a[tournamentsSortKey]).getTime();
                break;
            case 'name':
                if (a[tournamentsSortKey] < b[tournamentsSortKey]) {
                    result = -1;
                    break;
                }
                if (a[tournamentsSortKey] > b[tournamentsSortKey]) {
                    result = 1;
                    break;
                }
                result = 0;
                break;
            case 'sets':
                result = b[tournamentsSortKey] - a[tournamentsSortKey];
                break;
        }
        return result * tournamentsSortOrder;
    }

    const filterFunction = (data: FetchedTournament) => {
        if (tournamentsSearchKeyword) {
            const name = data.name.toLowerCase();
            const keyword = tournamentsSearchKeyword.toLowerCase();
            if (tournamentsFilterKey === 'all') {
                return name.indexOf(keyword) >= 0;
            }
            return (
                data.tournamentTypeId === tournamentTypeIds[tournamentsFilterKey] &&
                name.indexOf(keyword) >= 0
            )
        }
        if (tournamentsFilterKey === 'all') {
            return true;
        }
        return data.tournamentTypeId === tournamentTypeIds[tournamentsFilterKey]
    }

    return (
        <div className={classes.root}>
            {loggedIn &&
                <div className={classes.cardListContainer}>
                    {tournamentsData
                        .filter(filterFunction)
                        .sort(compareFunction)
                        .map(tournament => {
                            return (tournament ? <HomeCard
                                key={tournament?.id}
                                data={tournament}
                            /> : null)
                        })}
                </div>
            }
            {(!loggedIn || tournamentsData.length === 0) && <>
                <div className={classes.buttonContainer}>
                    <Logo width='160px' height='160px' fill='#9c9c9c' />
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleCreateTournament}
                    >
                        {loggedIn ? t('Create New Tournament') : t('Login to Create a Tournament')}
                    </Button>
                </div>
            </>
            }
        </div>
    )
}

export default Home
