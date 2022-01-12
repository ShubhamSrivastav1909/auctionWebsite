import React from 'react';
import Appln from './Bid';
import UpdateProfile from '../UpdateProfile';
import card2 from './card';
import { makeStyles } from "@material-ui/core/styles"
import logo from '../img.jpg';
import {
    BrowserRouter as Router, Route, Link
} from "react-router-dom";

import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GavelIcon from '@material-ui/icons/Gavel';
import Dis from "./displayD";

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit' },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}))

function AppC() {
    const classes = useStyles();
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Drawer
                    style={{ width: '250px' }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{ paper: classes.drawerPaper }}
                >
                    <List>
                        <Link to="/" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/edit" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Edit Profile details"} />
                            </ListItem>
                        </Link>
                        <Link to="/history" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Bid History"} />
                            </ListItem>
                        </Link>
                        <Link to="/bid" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <GavelIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Bid Items"} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <switch>
                    <Route exact={true} path="/">
                        <Container><header>
                            <Typography variant="h3" gutterBottom>
                              <header><h2> WELCOME CUSTOMER! </h2></header>
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <img src={logo} width="700" height="450" />
                            </Typography></header>
                        </Container>
                    </Route>
                    <Route path="/edit" component ={UpdateProfile}/>;
                    <Route path="/history" component = {card2}/>;
                    <Route path="/bid" component = {Appln} />;
                    <Route path="/disp"  component={Dis}/>
                </switch>



            </div>
        </Router>
    );
}

export default AppC;
