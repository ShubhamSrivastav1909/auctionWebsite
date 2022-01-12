import React, { useState } from "react";
import '../../App.css';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { payloadItemWatch } from './RegisterConstants';
import { initialiseObjectBooleanValues } from './RegisterItems';
import login from "./Login";
import {
    BrowserRouter as Router, Route, Link,Switch
} from "react-router-dom";

//import { postUserDetails } from 'C:/Users/USER/Downloads/auctionUser/src/main/java/com/example/restservice/UserController';
//import { storage } from 'C:/Users/USER/Downloads/auctionUser/src/main/java/com/example/restservice/firebaseInitialise';

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
        "name": true,
        "age": true,
        "aadhar": true,
        "pan": true,
        "mobile": true,
        "presentAddress": true,
        "gender": true,
        "email": true,
        "password": true,
        "userType": true
    });
    const [CNFpassword, setValue] = useState({
        "cnfPassword": true
    });

    function generateUserID() {
        var randomNumber = (Math.random() * (10 ** 6)).toString().substring(0, 6);
        console.log(` randomNumber generated ${randomNumber}`)
        setPayload((previousState) => ({
            ...previousState,
            userID: randomNumber,
        }));
    };
    
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
            generateUserID();
           // console.log(`input value ${JSON.stringify(payload)}`);
            try {
               const endpoint=`http://localhost:8080/user/postUserDetails`;
        
             const options={
            method : "post",
            headers: {'Content-Type':'application/json',
                       'Accept': 'application/xml'},
            body : JSON.stringify(payload)
        };

        const response=await fetch(endpoint,options);
        const responseJson = await response.json();
        return responseJson;
              } catch (error) {
                console.log(`Error on post ${error}`);
            }

            };

    };
    
      function isInputValid() {
        var invalidInputCount = 0;
        var emailValidationRegex=/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
        var passwordValidationRegex=/^(?:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))(?!.*(.)\1{2,})[A-Za-z0-9!~<>,;:_=?*+#.\"&§%°()\|\[\]\-\$\^\@\\/]{8,32}$/;
        var aadharValidationRegex=/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
        var mobileValidationRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
        var panValidationRegex=/^[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        
        if (payload.userType === null || payload.userType === undefined || payload.userType.length === 0) {
            console.log('UserType not selected');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                userType: false,
            }));
        }
        
          if (payload.gender === null || payload.gender === undefined || payload.gender.length === 0) {
            console.log('Gender not selected');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                gender: false,
            }));
        }
        
          if (payload.name === null || payload.name === undefined || payload.name.length === 0) {
            console.log('Name is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                name: false,
            }));
        }
        
        if (payload.age === null) {
            console.log('User Age is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                age: false,
            }));
        }
        
         if (payload.mobile === null || payload.mobile === undefined || payload.mobile.length === 0) {
            console.log('Mobile is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                mobile: false,
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
         
          if (payload.aadhar === null || payload.aadhar === undefined || payload.aadhar.length === 0) {
            console.log('Aadhar Number is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                aadhar: false,
            }));
        }
        
         if (payload.pan === null || payload.pan === undefined || payload.pan.length === 0) {
            console.log('Pan Number is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                pan: false,
            }));
        }
        
         if (payload.presentAddress === null || payload.presentAddress === undefined || payload.presentAddress.length === 0) {
            console.log('Address is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                presentAddress: false,
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
        
         if (CNFpassword.cnfPassword === null || CNFpassword.cnfPassword === undefined || CNFpassword.cnfPassword.length === 0) {
            console.log('Confirm-Password is empty');
            invalidInputCount = invalidInputCount + 1;
            setValue((previousState) => ({
                ...previousState,
                cnfPassword: false,
            }));
        }
        
        if (payload.age<18 || payload.age>80) {
            console.log('Invalid User Age');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                age: false,
            }));
        }
        
        
          if (!passwordValidationRegex.test(payload.password)) {
            console.log('Invalid Password');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                password: false,
            }));
        }
        
         if (CNFpassword.cnfPassword !== payload.password) {
            console.log('Password Mismatch');
            invalidInputCount = invalidInputCount + 1;
            setValue((previousState) => ({
                ...previousState,
                cnfPassword: false,
            }));
        }
          
         if (!mobileValidationRegex.test(payload.mobile)) {
            console.log('Invalid Mobile Number');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                mobile: false,
            }));
        }
        
         if (!emailValidationRegex.test(payload.email)) {
            console.log('Email is empty');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                email: false,
            }));
        }
         
          if (!aadharValidationRegex.test(payload.aadhar)) {
            console.log('Invalid Aadhar Number');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                aadhar: false,
            }));
        }
        
         if (!panValidationRegex.test(payload.pan)) {
            console.log('Invalid Pan Number');
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                pan: false,
            }));
        }

        return invalidInputCount === 0;
    }
  
    return (
      <div className="App">
    <header>  <h2>Register Here</h2>  </header>
       <body>
        <form className={classes.root} autoCompleted="off" >
        Account Type:<Select labelId="label1" id="userType" variant="outlined" value={payload.userType} onChange={(event) => {handleChange("userType", event)}} 
                    required error={!payloadValidation.userType} helperText={!payloadValidation.userType && "UserType Required"} displayEmpty className={classes.selectEmpty}>
                    <MenuItem value=""><em>--Select--</em></MenuItem>
                    <MenuItem value="vendor">Vendor</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                   </Select><br></br>
                     
        Name:<TextField id="name" label="Name" variant="outlined" onChange={(event) => {handleChange("name", event)}}
                        required error={!payloadValidation.name} helperText={!payloadValidation.name && "User should be assigned a name"}/><br></br>
        
        Age:<TextField id="age" label="Age" variant="outlined" onChange={(event) => {handleChange("age", event)}}
                        required error={!payloadValidation.age} helperText={!payloadValidation.age && "User should be assigned an age"}/><br></br>
                        
        Gender:<Select labelId="label2" id="gender" value={payload.gender} variant="outlined" onChange={(event) => {handleChange("gender", event)}} 
                    required error={!payloadValidation.gender} helperText={!payloadValidation.gender && "Gender Required"} displayEmpty className={classes.selectEmpty}>
                    <MenuItem value=""><em>--Select--</em></MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select><br></br>
                
        Mobile:<TextField id="mobile" label="Mobile" variant="outlined" onChange={(event) => {handleChange("mobile", event)}}
                        required error={!payloadValidation.mobile} helperText={!payloadValidation.mobile && "User should be assigned a contact number"}/><br></br>
                        
        Email:<TextField id="email" label="Email" variant="outlined" onChange={(event) => {handleChange("email", event)}}
                        required error={!payloadValidation.email} helperText={!payloadValidation.email && "User should be assigned an email id"}/><br></br>
                        
        Aadhar Number:<TextField id="aadhar" label="Aadhar Number" variant="outlined" onChange={(event) => {handleChange("aadhar", event)}}
                        required error={!payloadValidation.aadhar} helperText={!payloadValidation.aadhar && "User should be assigned aadhar number"}/><br></br>
                        
        Pan Number:<TextField id="pan" label="Pan Number" variant="outlined" onChange={(event) => {handleChange("pan", event)}}
                        required error={!payloadValidation.pan} helperText={!payloadValidation.pan && "User should be assigned pan number"}/><br></br>
                        
        Permanent Address:<TextField id="presentAddress" label="Address" variant="outlined" onChange={(event) => {handleChange("presentAddress", event)}}
                        required error={!payloadValidation.presentAddress} helperText={!payloadValidation.presentAddress && "User should be assigned an address"}/><br></br>
                        
        Password:<TextField id="password" label="Password" variant="outlined" onChange={(event) => {handleChange("password", event)}}
                        required error={!payloadValidation.password} helperText={!payloadValidation.password && "User should be assigned a password"}/>
                        <br></br>
        Confirm Password:<TextField id="cnfPassword" label="Confirm Password" variant="outlined" onChange={(event) =>setValue((previousState) => ({...previousState,["cnfPassword"]: event.target.value}))}
                        required error={!CNFpassword.cnfPassword} helperText={!CNFpassword.cnfPassword && "User should be assigned a password"}/><br></br>
            
               <Box m={1} p={1}>
                        <Button
style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
 variant="contained" color="primary" href="/log" onClick={handleSubmit}>Submit</Button>
               </Box><br></br>
          
        </form> </body>
          <Router>
              <Route path="/log" exact={true} component={login}/>
          </Router>

      </div>
  );
  }
        