import React from "react";

import {
    BrowserRouter as Router, Route, Link,Switch
} from "react-router-dom";

import login from "./Pages/UserLogin/Login";
import reg from "./Pages/UserLogin/Register";
import res from "./Pages/UserLogin/ResetPwd";
import AppV from "./Pages/VendorModule/AppV";
import AppC from "./Pages/CustomerModule/AppC";
import Dis from "./Pages/CustomerModule/displayD";
import WebP from "./WebP";

export default function App()
{

    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={WebP}/>
                <Route path="/log" exact={true} component={login}/>
                <Route path="/reg" exact={true} component={reg}/>
                <Route path="/res" exact={true} component={res}/>
                <Route path="/appC" exact={true} component={AppC}/>
                <Route path="/appV" exact={true} component={AppV}/>
                <Route path="/disp" exact={true} component={Dis}/>
            </Switch>
        </Router>

    );


}

