import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as Teams } from '../../resources/icons/teams.svg';
import { ReactComponent as Single } from '../../resources/icons/single.svg';
import { ReactComponent as DrawYourPartner } from '../../resources/icons/drawYourPartner.svg';
import { ReactComponent as MonsterDYP } from '../../resources/icons/monsterDYP.svg';
import { TournamentTypes } from '../../types/entities';
import tournamentStyles from './tournamentStyles';

interface Props {

}

const PlayerTypeSelect = (props: Props) => {
    const history = useHistory();
    const { t } = useTranslation();

    const { tournamentType } = useParams<{ tournamentType: TournamentTypes }>();
    const handleCardClick = (type: string) => {
        history.push(`/tournament/player-form/${tournamentType}/${type}`)
    }

    const classes = tournamentStyles();
    return (
        <div className={classes.cardListContainer}>
            {tournamentType === 'lms' &&
                <Card className={classes.cardRoot}>
                    <CardContent
                        className={classes.cardContent}
                        style={{ backgroundColor: '#fbc02d' }}
                        onClick={() => handleCardClick('monster-dyp')}
                    >
                        <MonsterDYP className={classes.cardIcon} />
                        <div className={classes.cardTitle}>{t('MonsterDYP')}</div>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        <IconButton onClick={() => handleCardClick('monster-dyp')}>
                            <PlayArrowIcon />
                        </IconButton>
                    </CardActions>
                </Card>}
            <Card className={classes.cardRoot}>
                <CardContent
                    className={classes.cardContent}
                    style={{ backgroundColor: '#8bc34a' }}
                    onClick={() => handleCardClick('teams')}
                >
                    <Teams className={classes.cardIcon} />
                    <div className={classes.cardTitle}>{t('Teams')}</div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton onClick={() => handleCardClick('teams')}>
                        <PlayArrowIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card className={classes.cardRoot}>
                <CardContent
                    className={classes.cardContent}
                    style={{ backgroundColor: '#e16f3d' }}
                    onClick={() => handleCardClick('single')}
                >
                    <Single className={classes.cardIcon} />
                    <div className={classes.cardTitle}>{t('Single')}</div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton onClick={() => handleCardClick('single')} >
                        <PlayArrowIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card className={classes.cardRoot}>
                <CardContent
                    className={classes.cardContent}
                    style={{ backgroundColor: '#00b8d4' }}
                    onClick={() => handleCardClick('dyp')}
                >
                    <DrawYourPartner className={classes.cardIcon} />
                    <div className={classes.cardTitle}>{t('Draw Your Partner')}</div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton onClick={() => handleCardClick('dyp')} >
                        <PlayArrowIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default PlayerTypeSelect
