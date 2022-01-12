import React from "react";
import { Grid } from "@material-ui/core";
import Header2 from "./Header2";
import Content2 from "./Content2";
import {Route, Router} from "react-router-dom";
import Dis from "./displayD";

const App = () => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header2 />
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={2} />
                <Grid item xs={12} sm={8}>
                    <Content2 />
                </Grid>
                <Grid item xs={false} sm={2} />
            </Grid>

        </Grid>
    );
};

export default App;
