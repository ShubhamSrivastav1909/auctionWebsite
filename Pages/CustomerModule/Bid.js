import { Grid } from "@material-ui/core";
import Header from "./Header";
import Content from "./Content";
import {BrowserRouter,Router, Route, Switch} from "react-router-dom";
import Dis from "./displayD";
import React from "react";

const App = () => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={2} />
                <Grid item xs={12} sm={8}>
                    <Content />
                </Grid>
                <Grid item xs={false} sm={2} />
            </Grid>

        </Grid>


    );
};

export default App;
