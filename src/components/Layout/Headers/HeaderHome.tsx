import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ActionStatus } from '../../../types/main';
import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import { TournamentFilterKeys, TournamentSortingKeys } from '../../../redux/settings/types';
import { updateSettings } from '../../../redux/settings/actions';
import { debounce } from 'lodash';
import clsx from 'clsx';
import headerStyles from './headerStyles';


interface Props {
}

const Header = (props: Props) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const authState = useSelector((state: RootState) => state.auth);
    const settingsState = useSelector((state: RootState) => state.settings);
    const loggedIn = authState.status === ActionStatus.Success;
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = headerStyles();
    const searchFieldRef = useRef<any>(null);
    const { t } = useTranslation();

    const sortingKeyNames: Record<TournamentSortingKeys, string> = {
        createdAt: t('sortBy_CreationDate'),
        updatedAt: t('sortBy_UpdateDate'),
        name: t('sortBy_Name'),
        sets: t('sortBy_Sets'),
    }

    const filterKeyNames: Record<TournamentFilterKeys, string> = {
        all: t('All Types'),
        elimination: t('Elimination'),
        lms: t('Last Man Standing'),
        roundRobin: t('Round Robin'),
    }

    const handleSortKeyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(updateSettings({ tournamentsSortKey: event.target.value as TournamentSortingKeys }));
    };

    const handleFilterKeyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(updateSettings({ tournamentsFilterKey: event.target.value as TournamentFilterKeys }));
    };

    const handleSortOrderChange = () => {
        dispatch(updateSettings({ tournamentsSortOrder: settingsState.tournamentsSortOrder === 1 ? -1 : 1 }));
    };

    const delayedDispatchSearchKeyword = /* useCallback( */debounce((value: string) => dispatch(updateSettings({ tournamentsSearchKeyword: value })), 500)/* , [searchKeyword]) */

    const handleSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearchKeyword(event.target.value as string)
        delayedDispatchSearchKeyword(event.target.value as string);
        // debounce(score => dispatch(updateSettings({ tournamentsSearchKeyword: event.target.value as string })), 500), [searchKeyword])
        //dispatch(updateSettings({ tournamentsSearchKeyword: event.target.value as string }));
    };

    const handleSearchOpen = () => {
        dispatch(updateSettings({ tournamentsSearchKeyword: '' }));
        setSearchOpen(true);
        setTimeout(() => {
            searchFieldRef?.current?.focus();
        }, 300);
    };

    const handleSearchClose = () => {
        dispatch(updateSettings({ tournamentsSearchKeyword: '' }));
        setSearchOpen(false);
    };

    return (
        <Toolbar className={classes.headerHomeRoot}>
            <div className={classes.headerHomeRow}>
                <Typography variant="h6" noWrap className={classes.title}>
                    {t('Manage Tournaments')}
                </Typography>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => { history.push('/tournament/new') }}
                >
                    {t('Create New Tournament')}
                </Button>
            </div>
            {
                <div className={classes.actionsContainer}>
                    <div className={classes.selectContainer}>
                        <div className={classes.selectContainerIcon}>
                            <Tooltip title={settingsState.tournamentsSortOrder === -1 ? `${t("Sort Descending")}` : `${t("Sort Ascending")}`}>
                                <IconButton className={classes.sortIconButton} aria-label="toggle-sort-order" onClick={handleSortOrderChange}>
                                    <SortIcon className={classes.icon} style={settingsState.tournamentsSortOrder === -1 ? { transform: 'rotateX(180deg)' } : {}} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            {t('Sort by')}
                        </div>
                        <Select
                            labelId="demo-simple-select-label"
                            title={t('Sort by')}
                            value={settingsState.tournamentsSortKey}
                            onChange={handleSortKeyChange}
                            className={classes.select}
                        >
                            {Object.keys(sortingKeyNames).map((key: string) => {
                                return <MenuItem key={key} value={key} className={classes.menuItem}>{sortingKeyNames[key as TournamentSortingKeys]}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className={classes.selectContainer}>
                        <div className={classes.selectContainerIcon}>
                            <FilterListIcon />
                        </div>
                        <div>
                            {t('Filter')}
                        </div>
                        <Select
                            labelId="demo-simple-select-label"
                            title={t('Filter')}

                            className={classes.select}
                            value={settingsState.tournamentsFilterKey}
                            onChange={handleFilterKeyChange}
                        >
                            {Object.keys(filterKeyNames).map((key: string) => {
                                return <MenuItem
                                    key={key}
                                    value={key}
                                    className={classes.menuItem}
                                    style={key === 'all' ? { borderBottom: '1px solid #e0e0e0' } : {}}
                                >
                                    {filterKeyNames[key as TournamentFilterKeys]}
                                </MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className={classes.searchContainer}>
                        <div className={clsx(classes.search, {[classes.searchOpen]: searchOpen })}>
                            <SearchIcon onClick={handleSearchOpen} className={classes.searchIcon} />
                            <Input
                                type='text'
                                value={searchKeyword}
                                inputRef={searchFieldRef}
                                // value={settingsState.tournamentsSearchKeyword}
                                onChange={handleSearchChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <CloseIcon onClick={handleSearchClose} className={classes.icon} />
                                    </InputAdornment>
                                }
                            />
                        </div>
                    </div>
                </div>
            }
        </Toolbar>
    )
}

export default Header
