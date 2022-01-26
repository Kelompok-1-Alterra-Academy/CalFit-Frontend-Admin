/* eslint-disable @next/next/link-passhref */
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useStyles from './TopBarStyles';
import jwtDecode from '../../../src/utils/jwtDecode/jwtDecode';

export const TopBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const { Email: email } = jwtDecode();
    setUsername(email);
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.topBar}>
        <Link href='/superadmin/dashboard'>
          <Image src='/calfit-logo-invert.png' alt='CalFit Logo' width={100} height={23} />
        </Link>
        <Tooltip title="Account settings">
          {/* <Link href='/superadmin/profile'> */}
          {/* <Button href='/superadmin/profile'> */}
          <Box
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <div className={classes.userInfo}>
              <Image src='/dummy.png' alt='Profile Picture' width={30} height={30} className={classes.profilePicture} />
              <Typography className={classes.pageTitle}>{username}</Typography>
            </div>
          </Box>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={(e) => {
            e.preventDefault();
            router.push('/superadmin/profile');
            handleClose();
          }}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

TopBar.propTypes = {
  label: PropTypes.string,
};
