import React from "react";
import { CircularProgress, CircularProgressProps } from "@mui/material";

const SpinnerUI = (props: CircularProgressProps) => {
  return <CircularProgress {...props} />;
};

export default React.memo(SpinnerUI);
