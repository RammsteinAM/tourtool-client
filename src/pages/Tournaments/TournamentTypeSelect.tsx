import React from 'react'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EliminationForm from './TournamentForm';
import clsx from 'clsx';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Whatshot from '@material-ui/icons/Whatshot';
import StarsIcon from '@material-ui/icons/Stars';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { ReactComponent as RoundRobinIcon } from '../../resources/icons/roundRobin.svg';
import { ReactComponent as LastManStandingIcon } from '../../resources/icons/lms.svg';
import { ReactComponent as Elimination } from '../../resources/icons/elimination.svg';

import tournamentStyles from './tournamentStyles';

interface Props {

}

const TournamentTypeSelect = (props: Props) => {

    const history = useHistory();
    const { t } = useTranslation();

    const handleCardClick = (type: string) => {
        history.push('/tournament-form/elimination')
    }

    const classes = tournamentStyles();
    return (
        <div className={classes.cardListContainer}>
            <Card className={classes.cardRoot}>
                <CardContent className={classes.cardContent} style={{ backgroundColor: '#00b8d4' }}>
                    <RoundRobinIcon className={classes.cardIcon} />
                    <div className={classes.cardTitle}>{t('Round Robin')}</div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="info">
                        <MoreHorizIcon />
                    </IconButton>
                    <IconButton >
                        <PlayArrowIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card className={classes.cardRoot}>
                <CardContent className={classes.cardContent} style={{ backgroundColor: '#9c27b0' }}>
                    <LastManStandingIcon className={classes.cardIcon} />
                    <div className={classes.cardTitle}>{t('Last Man Standing')}</div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="info">
                        <MoreHorizIcon />
                    </IconButton>
                    <IconButton >
                        <PlayArrowIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card className={classes.cardRoot}>
                <CardContent
                    className={classes.cardContent}
                    style={{ backgroundColor: '#8dbb5e' }}
                    onClick={() => handleCardClick('elimination')}
                >

                    <Elimination className={classes.cardIcon} />
                    <div className={classes.cardTitle}>{t('Elimination')}</div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="info">
                        <MoreHorizIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCardClick('elimination')} >
                        <PlayArrowIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default TournamentTypeSelect
