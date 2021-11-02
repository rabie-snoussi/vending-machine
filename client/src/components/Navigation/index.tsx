import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signOut } from 'actions/user.action';
import { PATHS } from 'shared/constants';
import locale from 'shared/locale.json';

interface Props extends RouteComponentProps {
  logout: Function;
}

const Navigation: React.FC<Props> = ({ logout, history }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfile = () => {
    handleClose();
    history.push(PATHS.PROFILE);
  };

  const onSignOut = () => {
    handleClose();
    logout();
  };

  const onHome = () => history.push(PATHS.HOME);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'black' }}>
        <Toolbar>
          <Typography
            onClick={() => onHome()}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {locale.home}
          </Typography>
          <Box>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => onProfile()}>{locale.profile}</MenuItem>
              <MenuItem onClick={() => onSignOut()}>{locale.signOut}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  logout: () => dispatch(signOut()),
});

export default withRouter(connect(null, mapDispatchToProps)(Navigation));
