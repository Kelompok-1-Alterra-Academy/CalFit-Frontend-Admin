/* eslint-disable @next/next/link-passhref */
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useStyles from "./TopBarStyles";

export const TopBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.topBar}>
        <Link href="/superadmin/dashboard">
          <Image
            src="/calfit-logo-invert.png"
            alt="CalFit Logo"
            width={100}
            height={23}
          />
        </Link>
        <Link href="/superadmin/profile">
          <div className={classes.userInfo}>
            <Image
              src="/dummy-pp.png"
              alt="Profile Picture"
              width={30}
              height={30}
              className={classes.profilePicture}
            />
            <Typography className={classes.pageTitle}>
              Superadmin
            </Typography>
          </div>
        </Link>
      </Box>
    </Box>
  );
};

TopBar.propTypes = {
  label: PropTypes.string,
};
