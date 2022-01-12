import React, { useState } from "react";
import '../../App.css';
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

import { payloadItemWatch } from './ResetPwdConstants';
import { initialiseObjectBooleanValues } from './ResetPwdItems';

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
        "userEmail": true,
        "userAadhar": true,
        "userType": true,
        "userPassword": true
    });
  const [CNFpassword, setValue] = useState({
        "cnfPassword": true
    });
    
const [open,setOpen] = useState(false);        
const handleClickOpen = () =>{ setOpen(true); };         
const handleClose = () =>{ setOpen(false); }; 
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
        
         try {
        const endpoint="http://localhost:8080/user";
        const response=await fetch(`${endpoint}/${payload.userType}/getValidationDetails/${payload.userEmail}/${payload.userAadhar}/${payload.userPassword}`);
        const responseJson = await response.json();
        return responseJson;
              } catch (error) {
                console.log(`Error on post ${error}`);
            }
        
        };
       handleClose();
    }; 
function isInputValid() 
{
      var invalidInputCount = 0;
 var passwordValidationRegex=/^(?:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))(?!.*(.)\1{2,})[A-Za-z0-9!~<>,;:_=?*+#.\"&§%°()\|\[\]\-\$\^\@\\/]{8,32}$/;

 if (payload.userPassword === null || payload.userPassword === undefined || payload.userPassword.length === 0) {
            console.log('Password is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userPassword: false,
            }));
        }
        
         if (CNFpassword.cnfPassword === null || CNFpassword.cnfPassword === undefined || CNFpassword.cnfPassword.length === 0) {
            console.log('Confirm-Password is empty');
            invalidInputCount = invalidInputCount + 1;
            setValue((previousState) => ({
                ...previousState,
                cnfPassword: false,
            }));
        }

    if (!passwordValidationRegex.test(payload.userPassword)) {
            console.log('Invalid Password');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userPassword: false,
            }));
        }
        
         if (CNFpassword.cnfPassword !== payload.userPassword) {
            console.log('Password Mismatch');
            invalidInputCount = invalidInputCount + 1;
            setValue((previousState) => ({
                ...previousState,
                cnfPassword: false,
            }));
        }
      return invalidInputCount === 0;
}
  return (
    <div className="App">
   <header>  <h2>Re-Set Your Password</h2> </header>
            <form className={classes.root} autoCompleted="off" >

		    Account Type:<Select labelId="label" id="userType" variant="outlined" value={payload.userType} onChange={(event) => {handleChange("userType", event)}} 
                    required error={!payloadValidation.userType} helperText={!payloadValidation.userType && "UserType Required"} displayEmpty className={classes.selectEmpty}>
                    <MenuItem value=""><em>--Select--</em></MenuItem>
                    <MenuItem value="vendor">Vendor</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                   </Select><br></br>

                 Email-ID:<TextField id="userEmail" label="Email-ID" variant="outlined" onChange={(event) => {handleChange("userEmail", event)}}
                 required error={!payloadValidation.userEmail} helperText={!payloadValidation.userEmail && "Email-ID Required"}/><br></br>
        
                 Aadhar Number:<TextField id="userAadhar" label="Aadhar Number" variant="outlined" onChange={(event) => {handleChange("userAadhar", event)}}
                 required error={!payloadValidation.userAadhar} helperText={!payloadValidation.userAadhar && "Aadhar Number Required"}/><br></br>
                  <Box m={1} p={1}>
                        <Button style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
 variant="contained" color="primary" onClick={handleClickOpen}>Validate</Button>
                      </Box> 
                      </form>
                 <Dialog open={open} onClose={handleClose}><body>
                      <DialogTitle id="reset">Minimum length 8 Atleast one digit and one letter</DialogTitle>
                      
                 <DialogActions>
                Password:<TextField id="userPassword" label="Password" variant="outlined" onChange={(event) => {handleChange("userPassword", event)}}
                required error={!payloadValidation.userPassword} helperText={!payloadValidation.userPassword && "User should be assigned a password"}/><br></br> <br></br>
                        
                Confirm Password:<TextField id="cnfPassword" label="Confirm Password" variant="outlined" onChange={(event) =>setValue((previousState) => ({...previousState,["cnfPassword"]: event.target.value}))}
                required error={!CNFpassword.cnfPassword} helperText={!CNFpassword.cnfPassword && "User should be assigned a password"}/><br></br> <br></br>
               
                   <Box m={1} p={1}>
                        <Button style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
 variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                        <br></br> <br></br>
                        <Button style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
 variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                      </Box> 
                 </DialogActions>
               </body>  </Dialog>
                 </div>
  );
}
