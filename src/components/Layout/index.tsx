import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentity from '@material-ui/icons/PermIdentity';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';
import { authActions } from '../../redux/auth/actions';
import Main from './Main';
import { Route, Switch } from 'react-router-dom';
import layoutStyles from './layoutStyles';
import Players from '../Tournament/Players';

const initialRightClick = {
  mouseX: null,
  mouseY: null,
};

enum SidePanelState {
  Initial,
  Settings,
  Profile,
  Players,
}

interface Props {
  children: ReactElement,
}

const Layout = (props: Props) => {
  const classes = layoutStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [rightClick, setRightClick] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialRightClick);
  const [showSidePanel, setShowSidePanel] = React.useState(false);
  const [panelContent, setPanelContent] = useState<SidePanelState>(SidePanelState.Initial);
  const history = useHistory();
  const authState = useSelector((state: RootState) => state.auth);
  const fullScreen = useSelector((state: RootState) => state.settings.fullScreen);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  const handleHomeButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push('/');
  };

  const openSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPanelContent(SidePanelState.Settings);
    setShowSidePanel(true);
  };

  const openPlayers = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPanelContent(SidePanelState.Players);
    setShowSidePanel(true);
  };

  const openAccount = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPanelContent(SidePanelState.Profile);
    setShowSidePanel(true);
  };

  const closeSidePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSidePanel(false);
  };

  const handleLoginButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push('/login');
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setRightClick({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseContextMenu = (e: React.MouseEvent) => {
    setRightClick(initialRightClick);
  };

  const handleProfileMenuItemClick = (e: React.MouseEvent) => {
    openAccount(e);
    handleCloseContextMenu(e);
  };

  const handleLogoutMenuItemClick = (e: React.MouseEvent) => {
    handleCloseContextMenu(e);
    dispatch(authActions.logout());
  };

  const renderSidePanel = (content: SidePanelState) => {
    switch (content) {
      case SidePanelState.Settings:
        return (
          <Switch>
            <Route exact path="/lms/:tournamentId">
              <Settings test />
            </Route>
            <Route path="/">
              <Settings />
            </Route>
          </Switch>
        )
      case SidePanelState.Players:
        return (
          <Route exact path="/lms/:tournamentId">
            <Players />
          </Route>
        )
      case SidePanelState.Profile:
        return <Profile />
      default:
        break;
    }
  }

  const name = authState.data?.displayName || authState.data?.email;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          root: clsx({
            [classes.fullScreen]: fullScreen,
          }),
          paper: clsx({
            [classes.sidePanelOpen]: showSidePanel,
            [classes.sidePanelClose]: !showSidePanel,
          }),
        }}
        onClose={closeSidePanel}
      >
        <div className={classes.panelHeader}>
          <IconButton aria-label="close" onClick={closeSidePanel} className={classes.icons}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.panelBody}>
          {
            renderSidePanel(panelContent)
          }
        </div>
      </Drawer>
      <Drawer
        onClick={handleDrawerClick}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          root: clsx({
            [classes.fullScreen]: fullScreen,
          }),
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerSettingsOpen]: showSidePanel,
            [classes.drawerSettingsClose]: !showSidePanel,
            [classes.fullScreen]: fullScreen,
          }),
        }}
      >
        <List>
          <ListItem button onClick={handleHomeButtonClick} className={classes.listItems}>
            <ListItemIcon>
              <HomeIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={t('Home')} classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button onClick={openSettings} className={classes.listItems}>
            <ListItemIcon>
              <SettingsIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={t('Settings')} classes={{ primary: classes.listItemText }} />
          </ListItem>
          <Switch>
            <Route exact path="/lms/:tournamentId">
              <ListItem button onClick={openPlayers} className={classes.listItems}>
                <ListItemIcon>
                  <PeopleIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary={t('Players')} classes={{ primary: classes.listItemText }} />
              </ListItem>
            </Route>
          </Switch>
        </List>
        <List>
          {authState.status === ActionStatus.Success ?
            <div onContextMenu={handleRightClick}>
              <ListItem button onClick={openAccount} className={classes.listItems}>
                <ListItemIcon>
                  <PersonIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary={name} title={name} classes={{ primary: classes.listItemText }} />
              </ListItem>
            </div> :
            <ListItem button onClick={handleLoginButtonClick} className={classes.listItems}>
              <ListItemIcon>
                <PermIdentity className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={t('Login')} classes={{ primary: classes.listItemText }} />
            </ListItem>
          }
        </List>
      </Drawer>

      <Main menuOpen={open} backdropVisible={showSidePanel} backdropCallback={closeSidePanel} fullScreen={fullScreen}>
        {props.children}
      </Main>

      <Menu
        keepMounted
        open={rightClick.mouseY !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          rightClick.mouseY !== null && rightClick.mouseX !== null
            ? { top: rightClick.mouseY, left: rightClick.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleProfileMenuItemClick}>{t('User Profile')}</MenuItem>
        <MenuItem onClick={handleLogoutMenuItemClick}>{t('Logout')}</MenuItem>
      </Menu>
    </div>
  );
}

export default Layout;