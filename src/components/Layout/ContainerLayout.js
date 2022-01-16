import React from 'react';
import { Container, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useStyles } from './ContainerLayoutStyles';

export const ContainerLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box>
      <Container className={classes.root}>
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};

ContainerLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
