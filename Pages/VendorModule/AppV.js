import React from 'react';
import Edit from '../UpdateProfile';
import history from './Ihistory';
import Input from './InputD';
import { makeStyles } from "@material-ui/core/styles";
import logo from '../img.jpg';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";

import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import ArrowDropDownCircleIcon  from "@material-ui/icons/ArrowDropDownCircle";

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit' },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}))

function App() {
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
                        <Link to="/addItem" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Add Items"} />
                            </ListItem>
                        </Link>
                        <Link to="/Ihistory" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ArrowDropDownCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Item History"} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <switch>
                    <Route exact path="/">
                        <Container>
                            <Typography variant="h3" gutterBottom>
                       <header>         WELCOME VENDOR!   </header>
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <img src={logo} width="500" height="300" />
                            </Typography>
                        </Container>
                    </Route>
                    <Route path="/edit" component={Edit}/>;

                    <Route exact path="/addItem" component={Input}/>;
                    <Route exact path="/Ihistory" component={history}/>;
                </switch>



            </div>
        </Router>
    );
}

export default App;

