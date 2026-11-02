import React from "react";
import "./loader.css";
import { Typography } from "@mui/material";

const Loader = () => {
  return (
    <div className="loadingPage">
      <div className="loadingCircle"></div>
      <Typography variant="h5" className="loadingText">
        Loading...
      </Typography>
    </div>
  );
};

export default Loader;
