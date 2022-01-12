import React, { useState } from "react";
import '../../App.css';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { payloadItemWatch } from './LoginConstants';
import { initialiseObjectBooleanValues } from './LoginItems';
import {BrowserRouter as Router, Route} from "react-router-dom";
import reg from "./Register";
import res from "./ResetPwd";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

export default function Login(props) {

    const classes = useStyles();
    const [payload, setPayload] = useState(payloadItemWatch);
    //  const [image, setImage] = useState(null);
    const [payloadValidation, setPayloadValidation] = useState({
        "userType": true,
        "email": true,
        "password": true
    });

    function handleChange(label, event) {
        // displayOtherBox(label, event);
        setPayload((previousState) => ({
            ...previousState,
            [label]: event.target.value,
        }));
    }

    async function handleSubmit(event) {

        //initialize validation
        var newPayloadValidation = initialiseObjectBooleanValues(payloadValidation, true);
        setPayloadValidation(newPayloadValidation);

        //Verify all the inputs
        var isValid = isInputValid();
        console.log(` is input valid ${isValid}`);
        if (isValid) {
            console.log(`input value ${JSON.stringify(payload)}`);
            try {
                const endpoint="http://localhost:8080/user/";
                const response=await fetch(`${endpoint}/${payload.userType}/getUserDetails/${payload.email}/${payload.password}`);
                const responseJson = await response.json();
                return responseJson;
            } catch (error) {
                console.log(`Error on post ${error}`);
            }

        };
    };

    function isInputValid()
    {
        var invalidInputCount = 0;

        if (payload.userType === null || payload.userType === undefined || payload.userType.length === 0) {
            console.log('UserType not selected');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userType: false,
            }));
        }

        if (payload.email === null || payload.email === undefined || payload.email.length === 0) {
            console.log('Email is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                email: false,
            }));
        }

        if (payload.password === null || payload.password === undefined || payload.password.length === 0) {
            console.log('Password is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                password: false,
            }));
        }

        return invalidInputCount === 0;
    }

    return (
        <div className="App">
         <header>   <h2>WELCOME !!!</h2> </header>
          <body>  New User?<a href="/reg"> Click-Here </a>to Register<br></br><br></br>

            <form className={classes.root} autoCompleted="off" >
                Account Type:<Select labelId="label" id="userType" variant="outlined" value={payload.userType} onChange={(event) => {handleChange("userType", event)}}
                                     required error={!payloadValidation.userType} helperText={!payloadValidation.userType && "UserType Required"} displayEmpty className={classes.selectEmpty}>
                <MenuItem value=""><em>--Select--</em></MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
            </Select><br></br>
                Username:<TextField id="email" label="Email-Id" variant="outlined" onChange={(event) => {handleChange("email", event)}}
                                    required error={!payloadValidation.email} helperText={!payloadValidation.email && "Email-Id Required"}/><br></br>

                Password:<TextField id="password" label="Password" variant="outlined" onChange={(event) => {handleChange("password", event)}}
                                    required error={!payloadValidation.password} helperText={!payloadValidation.password && "Password Required"}/><br></br>

                <Box m={1} p={1}>
                    <Button style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
 variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Box><br></br>
            </form>
            Problem In Login?<a href="/res">Click-Here</a><br></br><br></br> </body>
            <Router>
                <Route path = "/res" component={res}></Route>
            </Router>
            <Router>
                <Route path = "/reg" component={reg}></Route>
            </Router>
        </div>
    );
}