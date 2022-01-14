import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { ContainerLayout } from "./ContainerLayout";

export const RootLayout = ({ children }) => {

  return (
    <Box>
      <ContainerLayout>
        <Box>{children}</Box>
      </ContainerLayout>
    </Box>
  );
};

RootLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
