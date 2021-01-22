import React, { ReactElement, ReactEventHandler } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentity from '@material-ui/icons/PermIdentity';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import layoutStyles from './layoutStyles';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import LanguageSelect from '../LanguageSelect';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';

interface Props {
  children: ReactElement,
}

const Layout = (props: Props) => {
  const classes = layoutStyles();
  const [open, setOpen] = React.useState(false);
  const [showSidePanel, setShowSidePanel] = React.useState(false);
  const history = useHistory();
  const authState = useSelector((state: RootState) => state.auth);
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
    setShowSidePanel(true);
  };

  const closeSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSidePanel(false);
  };

  const handleLoginButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" noWrap>
            {t('Manage Tournaments')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: clsx({
            [classes.sidePanelOpen]: showSidePanel,
            [classes.sidePanelClose]: !showSidePanel,
          }),
        }}
        onClose={closeSettings}
      >
        <div className={classes.settingsHeader}>
          <IconButton aria-label="close" onClick={closeSettings} className={classes.icons}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.settingsBody}>
          {
            <LanguageSelect />
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
            <ListItemText primary={t('Home')} classes={{primary: classes.listItemText}} />
          </ListItem>
          <ListItem button onClick={openSettings} className={classes.listItems}>
            <ListItemIcon>
              <SettingsIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={t('Settings')} classes={{primary: classes.listItemText}}  />
          </ListItem>
        </List>
        <List>
          {authState.status === ActionStatus.Success ?
            <ListItem button /* onClick={openAccount} */ className={classes.listItems}>
              <ListItemIcon>
                <PermIdentity className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={t('Account')} classes={{primary: classes.listItemText}}  />
            </ListItem> :
            <ListItem button onClick={handleLoginButtonClick} className={classes.listItems}>
              <ListItemIcon>
                <PermIdentity className={classes.icons} />
              </ListItemIcon>
              <ListItemText primary={t('Login')} classes={{primary: classes.listItemText}}  />
            </ListItem>
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <Backdrop open={showSidePanel} onClick={closeSettings} />
        {props.children}
      </main>
    </div>
  );
}

export default Layout;