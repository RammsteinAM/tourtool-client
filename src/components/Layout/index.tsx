import React, { ReactElement, ReactEventHandler, useEffect, useState } from 'react';
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
import layoutStyles from './layoutStyles';

const initialRightClick = {
  mouseX: null,
  mouseY: null,
};

enum SidePanelState {
  Initial,
  Settings,
  Profile,
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

  const closeSidePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSidePanel(false);
  };

  const openAccount = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPanelContent(SidePanelState.Profile);
    setShowSidePanel(true);
  };

  // const closeSettings = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setShowSidePanel(false);
  // };

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
        return <Settings />
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
          paper: clsx({
            [classes.sidePanelOpen]: showSidePanel,
            [classes.sidePanelClose]: !showSidePanel,
          }),
        }}
        onClose={closeSidePanel}
      >
        <div className={classes.settingsHeader}>
          <IconButton aria-label="close" onClick={closeSidePanel} className={classes.icons}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.settingsBody}>
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
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerSettingsOpen]: showSidePanel,
            [classes.drawerSettingsClose]: !showSidePanel,
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

      <Main menuOpen={open} backdropVisible={showSidePanel} backdropCallback={closeSidePanel}>
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