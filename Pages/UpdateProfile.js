import React, { useState } from "react";
import '../App.css';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { payloadItemWatch } from './UpdateConstants';
import { initialiseObjectBooleanValues } from './UpdateItems';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));


export default function App(props) {

const classes = useStyles();       

const [payload, setPayload] = useState(payloadItemWatch);
  //  const [image, setImage] = useState(null);
    const [payloadValidation, setPayloadValidation] = useState({
        "userMobile": true,
        "userAddress": true,
        "userType": true,
        "userEmail": true
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
        payload.userType="vendor";
        payload.userEmail="defgh@gmail.com";
         try {
        const endpoint="http://localhost:8080/user";
        const response=await fetch(`${endpoint}/${payload.userType}/getUpdateDetails/${payload.userEmail}/${payload.userMobile}/${payload.userAddress}`);
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
         var mobileValidationRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;

 if (payload.userMobile === null || payload.userMobile === undefined || payload.userMobile.length === 0) {
            console.log('Mobile is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userMobile: false,
            }));
        }

 if (payload.userAddress === null || payload.userAddress === undefined || payload.userAddress.length === 0) {
            console.log('Address is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userAddress: false,
            }));
        }

  if (!mobileValidationRegex.test(payload.userMobile)) {
            console.log('Invalid Mobile Number');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userMobile: false,
            }));
        }

      return invalidInputCount === 0;
}

  return (
    <div className="App">
   <header> <h2>Update Your Profile</h2> </header>
        <body>   <form className={classes.root} autoCompleted="off" >


                 Mobile Number:<TextField id="userMobile" label="Mobile Number" variant="outlined" onChange={(event) => {handleChange("userMobile", event)}}
                 required error={!payloadValidation.userMobile} helperText={!payloadValidation.userMobile && "Mobile Number Required"}/><br></br>
        
                 Address:<TextField id="userAddress" label="Permanent Address" variant="outlined" onChange={(event) => {handleChange("userAddress", event)}}
                 required error={!payloadValidation.userAddress} helperText={!payloadValidation.userAddress && "Aadhar Number Required"}/><br></br>
                  <Box m={1} p={1}>
                        <Button 
                        style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
                        variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
                      </Box> 
              </form> </body>
    </div>
  );
}
