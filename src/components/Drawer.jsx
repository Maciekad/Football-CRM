import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import { FaHome, FaUser, FaCalendar, FaFutbol, FaTicketAlt, FaCog, FaWonSign, FaFootballBall} from 'react-icons/fa';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ListItemLink from './ListItemLink';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#001433',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    backgroundColor: '#f5f5f5',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    marginRight: "auto",
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.logo}>
            Football CRM
          </Typography>
          {!isAuthenticated ? (
            <Button
              css={css`
                text-decoration: none !important;
                color: white;
                display: block;
                transition: 0.3s;
                cursor: pointer;
                :hover {
                  color: white;
                }
              `}
              color="inherit"
              onClick={() => loginWithRedirect()}
            >
              <FaUser
                css={css`
                  margin-right: 3px;
                `}
              />
              Login
            </Button>
          ) : (
            <div css={css`display:flex;`}>
              <p>{user.email}</p>
            <Button
              css={css`
                text-decoration: none !important;
                color: white;
                display: block;
                transition: 0.3s;
                cursor: pointer;
                :hover {
                  color: white;
                }
              `}
              color="inherit"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <FaUser
                css={css`
                  margin-right: 3px;
                `}
              />
              Log out
            </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink
            icon={
              <FaHome
                size="20px"
                css={css`
                  margin-left: 10px;
                `}
              />
            }
            primary="Home"
            to="/"
          />
        </List>
        {isAuthenticated && (
          <List>
            <ListItemLink
              icon={
                <FaUser
                  size="20px"
                  css={css`
                    margin-left: 10px;
                  `}
                />
              }
              primary="User profile"
              to="/myaccount/profile"
            />
          </List>
        )}

        <List>
          <ListItemLink
            icon={
              <FaCalendar
                size="20px"
                css={css`
                  margin-left: 10px;
                `}
              />
            }
            primary="Fixtures"
            to="/fixtures"
          />
        </List>

        <List>
          <ListItemLink
            icon={
              <FaWonSign
                size="20px"
                css={css`
                  margin-left: 10px;
                `}
              />
            }
            primary="Results"
            to="/results"
          />
        </List>

        <List>
          <ListItemLink
            icon={
              <FaFootballBall
                size="20px"
                css={css`
                  margin-left: 10px;
                `}
              />
            }
            primary="Team"
            to="/team"
          />
        </List>

        <List>
          <ListItemLink
            icon={
              <FaTicketAlt
                size="20px"
                css={css`
                  margin-left: 10px;
                `}
              />
            }
            primary="Tickets"
            to="/myaccount/tickets"
          />
        </List>

        <List>
          <ListItemLink
            icon={
              <FaCog
                size="20px"
                css={css`
                  margin-left: 10px;
                `}
              />
            }
            primary="Settings"
            to="/settings"
          />
        </List>
      </Drawer>
    </div>
  );
}