import React,{useState} from 'react';

import {Container, AppBar, Toolbar, Typography, IconButton, Link, CssBaseline} from '@mui/material';

import {createTheme, ThemeProvider} from '@mui/material/styles';

import AccountCircle from '@mui/icons-material/AccountCircle';


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import MainDrawer from './drawer';

import {PATH_APP} from "../routes/paths"

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation, useNavigate } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListSubheader, ListItemButton } from '@mui/material';


const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      color: theme.palette.text.primary
    })
  );
  
  const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  }));
  
  const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

function NavItem({ item, isShow }) {
    const theme = useTheme();
    const { pathname } = useLocation();
    const { title, path, icon, info, children } = item;
    const isActiveRoot = path ? !!matchPath({ path, end: false }, pathname) : false;

    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = () => {
        setOpen(!open);
    };

    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': { display: 'block' }
    };

    const activeSubStyle = {
        color: 'text.primary',
        fontWeight: 'fontWeightMedium'
    };

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle)
                    }}
                >
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

                    {isShow && (
                        <>
                            <ListItemText disableTypography primary={title} />
                            {info && info}
                            <Box
                                component={Icon}
                                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                                sx={{ width: 16, height: 16, ml: 1 }}
                            />
                        </>
                    )}
                </ListItemStyle>

                {isShow && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {children.map((item) => {
                                const { title, path } = item;
                                const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;

                                return (
                                    <ListItemStyle
                                        key={title}
                                        component={RouterLink}
                                        to={path}
                                        sx={{
                                            ...(isActiveSub && activeSubStyle)
                                        }}
                                    >
                                        <ListItemIconStyle>
                                            <Box
                                                component="span"
                                                sx={{
                                                    width: 4,
                                                    height: 4,
                                                    display: 'flex',
                                                    borderRadius: '50%',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: 'text.disabled',
                                                    transition: (theme) => theme.transitions.create('transform'),
                                                    ...(isActiveSub && {
                                                        transform: 'scale(2)',
                                                        bgcolor: 'primary.main'
                                                    })
                                                }}
                                            />
                                        </ListItemIconStyle>
                                        <ListItemText disableTypography primary={title} />
                                    </ListItemStyle>
                                );
                            })}
                        </List>
                    </Collapse>
                )}
            </>
        );
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle)
            }}
        >
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            {isShow && (
                <>
                    <ListItemText disableTypography primary={title} />
                    {info && info}
                </>
            )}
        </ListItemStyle>
    );
}

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()

  return (
    <div>
     <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate(PATH_APP.app.profile)}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.        '}
      <br></br>
      <Link color="inherit" href="http://localhost:3000/app/contact">
      Contact
      </Link>{' '}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '45vh',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
            BiteBliss
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


export default function DenseAppBar({ isOpenNav, toggleOpenNav }) {

    return (
        <div >
            <AppBar position="static">
                <Toolbar >
                    <IconButton edge="start"  color="inherit" onMouseEnter={toggleOpenNav} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" component="div" sx={{ flexGrow: 1 }} color="inherit" onClick={toggleOpenNav} aria-label="menu">
                        <Typography variant="h6"   color="inherit"  >
                            BiteBliss
                        </Typography>
                        <MainDrawer state={isOpenNav} toggleOpenNav={toggleOpenNav} />
                    </IconButton>
                    <ProfileMenu/>
                </Toolbar>
            </AppBar>
        </div>
    );
}