import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AcUnitRoundedIcon from "@material-ui/icons/AcUnitRounded";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
   <AppBar position="static">
      <header><Toolbar>
        <Typography className={classes.typographyStyles}>
        <h2>  Welcome Customer!!--------------------------------------Items to Bid-------------------------------------------------
        </h2></Typography>
        <AcUnitRoundedIcon />
      </Toolbar></header>
    </AppBar>

  );
};

export default Header;
