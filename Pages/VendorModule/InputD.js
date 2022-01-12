/*
    Auction Start and End date time rules :
    i. End date time can't be before Start Date time
    ii. Min End date time = Start Date time + 1 hours
    iii.Max End date time = Start Date time + 15 days
 */

import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Grid,
    TextField,
    Box,
    Button,
    MenuItem,
    makeStyles,
    InputAdornment,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import {
    sources,
    watchBrandNames,
    payloadItemWatch,
} from "../../Utils/ConstantsUtils";
import { initialiseObjectBooleanValues } from "../../Utils/ItemsUtils";
import { postItemDetails } from "../../APIService/ItemHandlerService";
import { storage } from "../../firebaseInitialise";
import "date-fns";
import HelpIcon from "@material-ui/icons/Help";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DialogBox from "../DialogBox";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from "@material-ui/lab/DateTimePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import startTimer from '../../Utils/TimeUtils';
const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "40ch",
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ItemWatchInputDetails(props) {
    const classes = useStyles();
    const [payload, setPayload] = useState(payloadItemWatch);
    const [image, setImage] = useState(null);
    const [payloadValidation, setPayloadValidation] = useState({
        itemName: true,
        basePrice: true,
        source: true,
        weight: true,
        brandName: true,
        itemAge: true,
        workingCondition: true,
        imageURL: true,
        minDateTimeMessage : true,
        maxDateTimeMessage : true
    });

    const [isSourceOtherSelected, setIsSourceOtherSelected] = useState(false);
    const [isBrandNameOtherSelected, setIsBrandNameOtherSelected] = useState(
        false
    );
    //const [isSubmitButtonPressed, setIsSubmitButtonPressed] = useState(false);
    const [progress, setProgress] = useState(0);
    const minimumAuctionStartDateFromToday = 24; //hours
    const minimumAuctionStartDateTime=new Date();
    minimumAuctionStartDateTime.setHours(minimumAuctionStartDateTime.getHours()+minimumAuctionStartDateFromToday);
    const [selectedStartDateTime, setSelectedStartDateTime] = React.useState(
        minimumAuctionStartDateTime);
    const minimumAuctionDuration = 1; //hour
    const maximumAuctionDuration = 15; //days

    const endDateMinimumValue = new Date(selectedStartDateTime.getTime());
    endDateMinimumValue.setHours(
        endDateMinimumValue.getHours() + minimumAuctionDuration
    );
    const endDateMaximumValue = new Date(selectedStartDateTime.getTime());
    endDateMaximumValue.setHours(
        endDateMaximumValue.getHours() + maximumAuctionDuration * 24
    );
    const [selectedEndDateTime, setSelectedEndDateTime] = React.useState(
        endDateMinimumValue
    );

    useEffect(()=>{
        console.log(`input value payload in useEffect ${JSON.stringify(payload)}`)
    },[payload]);

    function generateItemID() {
        var randomNumber = (Math.random() * 10 ** 6).toString().substring(0, 6);
        console.log(` randomNumber generated ${randomNumber}`);
        if( randomNumber.length === 0){
            console.log(`Empty random number generated`);
            generateItemID();
        }
        else{

            setPayload((previousState) => ({
                ...previousState,
                itemID: randomNumber,
            }));
        }

        console.log(`input value payload after generating itemID ${JSON.stringify(payload)}`);
    }

    function displayOtherBox(label, event) {
        if (label === "source") {
            if (sources.filter((e) => e.value === event.target.value).length > 0) {
                if (event.target.value === "Other") {
                    setIsSourceOtherSelected(true);
                } else {
                    setIsSourceOtherSelected(false);
                }
            }
        }
        if (label === "brandName") {
            if (
                watchBrandNames.filter((e) => e.value === event.target.value).length > 0
            ) {
                if (event.target.value === "Other") {
                    setIsBrandNameOtherSelected(true);
                } else {
                    setIsBrandNameOtherSelected(false);
                }
            }
        }
    }

    function isDateTimeValid(){
        const HOUR_MILLISECONDS=3600000;
        const DAY_MILLISECONDS=24*HOUR_MILLISECONDS;
        if(selectedEndDateTime.getTime() <= selectedStartDateTime.getTime())
            //endDateTime is before startDateTime
            return false;
        if( selectedEndDateTime.getTime() - selectedStartDateTime.getTime() < HOUR_MILLISECONDS )
            //difference between startDateTime and endDateTime is less than an hour
            return false;
        if( selectedEndDateTime.getTime() - selectedStartDateTime.getTime() > 15*DAY_MILLISECONDS )
            //difference between startDateTime and endDateTime is more than 15 days
            return false;


        return true;
    }
    function isInputValid() {
        var invalidInputCount = 0;
        if (
            payload.itemName === null ||
            payload.itemName === undefined ||
            payload.itemName.length === 0
        ) {
            console.log("Name is empty");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                itemName: false,
            }));
        }
        if (payload.basePrice < 500) {
            console.log("Base price too low");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                basePrice: false,
            }));
        }
        if (payload.itemAge < 1) {
            console.log("Age too low");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                itemAge: false,
            }));
        }
        if (
            payload.source === undefined ||
            payload.source === null ||
            payload.source.length === 0 ||
            payload.source === "Other"
        ) {
            console.log("Source non-existent");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                source: false,
            }));
        }
        if (payload.weight < 0.005) {
            console.log("Weight too low");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                weight: false,
            }));
        }
        if (
            payload.brandName === undefined ||
            payload.brandName === null ||
            payload.brandName.length === 0 ||
            payload.brandName === "Other"
        ) {
            console.log("Brand name non-existent");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                brandName: false,
            }));
        }

        if (image === null) {
            console.log("Image not uploaded");
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                imageURL: false,
            }));
        }

        if(!isDateTimeValid()){
            invalidInputCount = invalidInputCount + 1;
            setPayloadValidation((previousState) => ({
                ...previousState,
                minDateTimeMessage: false,
                maxDateTimeMessage: false,
            }));
        }

        return invalidInputCount === 0;
    }
    function handleChange(label, event) {
        displayOtherBox(label, event);
        setPayload((previousState) => ({
            ...previousState,
            [label]: event.target.value,
        }));
    }
    function handleSetURL(url) {
        setPayload((previousState) => ({
            ...previousState,
            imageURL: url,
        }));
    }
    function handleUpdate(label,value){
        setPayload((previousState) => ({
            ...previousState,
            [label]: value,
        }));
    }
    async function handleSubmit(event) {
        console.log(`handleSubmit button`);
        //setIsSubmitButtonPressed(true);
        //await startTimer(1000);
        //initialize validation
        var newPayloadValidation = initialiseObjectBooleanValues(
            payloadValidation,
            true
        );
        setPayloadValidation(newPayloadValidation);

        //Verify all the inputs
        var isValid = isInputValid();
        //var isValid=true;
        console.log(` is input valid ${isValid}`);
        if (isValid) {


            setPayload((previousState) => ({
                ...previousState,
                startingDateTime: selectedStartDateTime.getTime(),
                endingDateTime: selectedEndDateTime.getTime(),
            }));

            console.log(`input value payload after adding dates ${JSON.stringify(payload)}`);
            generateItemID();

            //upload image to storage
            await handleFileUpload();

            console.log(`input value payload ${JSON.stringify(payload)}`);
            let count=0;
            await postItemDetailsHandler(count);


        }else{
            //setIsSubmitButtonPressed(false);
        }
    }

    async function postItemDetailsHandler(count){
        try {
            const response = await postItemDetails("watch", payload);
            if(response.length === 0){
                if(count <= 2){
                    count=count+1;
                    await startTimer(1000);
                    await postItemDetailsHandler(count);
                }
                else{
                    throw new Error("Failed to load resource");
                }

            }
            else{
                console.log(`postItemDetails response ${JSON.stringify(response)}`);
                alert("Uploaded item for auction succesfully!");
            }
            //setIsSubmitButtonPressed(false);

        } catch (error) {
            console.log(`Error on post ${error}`);
            alert("Error on Posting Item Details, try again later.");


            //if post request has error delete the uploaded file maybe from storage?
        }
    }
    async function handleFileChange(event) {
        if (event.target.files[0].size > 120000) {
            alert("File size is greater than 120kB ");
            setImage(null);
            setProgress(0);
        } else if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    async function handleFileUpload() {
        if (image === null || image === undefined) {
            alert("Choose an image!");
        } else if (image !== null && image !== undefined) {
            var randomNumber7Digit = (Math.random() * 10 ** 6)
                .toString()
                .substring(0, 7);
            var imageName = `${randomNumber7Digit}-${image.name}`;
            const uploadTask = storage.ref(`items/watch/${imageName}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref(`items/watch/${imageName}`)
                        .getDownloadURL()
                        .then((url) => {
                            handleSetURL(url);
                        });
                }
            );
        }
    }
    const getInstructionsDialogBoxContent = () => {
        return (
            <div>
                <ul>
                    <li>
                        End Date and Time of auction cannot be before Start Date and Time.
                    </li>
                    <li>
                        The auction can only start {minimumAuctionStartDateFromToday} hrs
                        after uploading item details, after verification of details.
                    </li>
                    <li>
                        The minimum duration of an auction has to be{" "}
                        {minimumAuctionDuration} hour.
                    </li>
                    <li>
                        The maximum duration of an auction has to be{" "}
                        {maximumAuctionDuration} days.
                    </li>
                </ul>
            </div>
        );
    };

    //console.log(`Uploaded image name ${image !== null && image.name}`);
    console.log(` startDateTime ${selectedStartDateTime}`);
    console.log(` endDateTime ${selectedEndDateTime}`);
    return (
        <div>
            <script src="http://localhost:8097"></script>
            <header><h1>Item Watch Input Details</h1></header>
            <div>
                <form className={classes.root}>
                    <TextField
                        id="itemName"
                        label="Item Name"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange("itemName", event);
                        }}
                        required
                        error={!payloadValidation.itemName}
                        helperText={
                            !payloadValidation.itemName && "Item should be assigned a name"
                        }
                    />

                    <br />

                    <TextField
                        id="basePrice"
                        label="Base Price"
                        type="number"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange("basePrice", event);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">INR</InputAdornment>
                            ),
                            inputProps: { min: 500 },
                        }}
                        required
                        error={!payloadValidation.basePrice}
                        helperText={
                            !payloadValidation.basePrice &&
                            "Base price should be above INR 500"
                        }
                    />

                    <br />

                    <TextField
                        id="source"
                        select
                        label="Source"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange("source", event);
                        }}
                        required
                        error={!payloadValidation.source}
                        helperText={
                            !payloadValidation.source &&
                            payload.source !== "Other" &&
                            "Item should have a source"
                        }
                    >
                        {sources.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {isSourceOtherSelected && (
                        <TextField
                            id="source-other"
                            label="Other Source"
                            variant="outlined"
                            onChange={(event) => {
                                handleChange("source", event);
                            }}
                            required
                            error={!payloadValidation.source}
                            helperText={
                                !payloadValidation.source && "Item should have a source"
                            }
                        />
                    )}
                    <br />

                    <TextField
                        id="weight"
                        label="Weight"
                        type="number"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange("weight", event);
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            inputProps: { min: 0.005 },
                        }}
                        required
                        error={!payloadValidation.weight}
                        helperText={
                            !payloadValidation.weight && "Weight should be more than 0.005 g"
                        }
                    />

                    <br />

                    <TextField
                        id="brandName"
                        select
                        label="Brand Name"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange("brandName", event);
                        }}
                        required
                        error={!payloadValidation.brandName}
                        helperText={
                            !payloadValidation.brandName &&
                            payload.brandName !== "Other" &&
                            "Item should have a brand name"
                        }
                    >
                        {watchBrandNames.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {isBrandNameOtherSelected && (
                        <TextField
                            id="brandName-other"
                            label="Other Brand"
                            variant="outlined"
                            onChange={(event) => {
                                handleChange("brandName", event);
                            }}
                            required
                            error={!payloadValidation.brandName}
                            helperText={
                                !payloadValidation.brandName && "Item should have a brand name"
                            }
                        />
                    )}

                    <br />

                    <TextField
                        id="itemAge"
                        type="number"
                        label="Item Age"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange("itemAge", event);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">Years</InputAdornment>
                            ),
                            inputProps: { min: 1 },
                        }}
                        required
                        error={!payloadValidation.itemAge}
                        helperText={
                            !payloadValidation.itemAge && "Item Age should be greater than 1"
                        }
                    />

                    <br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend" required={true}>
                            Working Condition
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="workingCondition"
                            value={payload.workingCondition}
                            onChange={(event) => {
                                handleChange("workingCondition", event);
                            }}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <br />

                    <FormLabel component="legend" required={true}>
                        Upload image file (jpg/jpeg/png).File size should be lesser than
                        120kB
                    </FormLabel>
                    {!payloadValidation.imageURL && (
                        <FormLabel component="legend" error={true}>
                            Image is required, please upload
                        </FormLabel>
                    )}

                    <br />
                    <Grid container justify="left" alignItems="left">
                        <Box component="div" position="relative" display="inline-flex">
                            <CircularProgress variant="determinate" value={progress} />
                            <Box
                                top={0}
                                left={0}
                                bottom={0}
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="caption"
                                    component="div"
                                    color="textSecondary"
                                >{`${progress}%`}</Typography>
                            </Box>
                        </Box>
                        <Box m={1} p={1}>
                            <Button
                                variant="contained"
                                component="label"
                                endIcon={<PhotoCamera />}
                            >
                                Choose Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png"
                                />
                            </Button>
                        </Box>
                        {/*<Box m={1} p={1}>
                  <Button variant="contained" color="primary" endIcon={<CloudUploadIcon />} onClick={handleFileUpload}>Upload Image</Button>
            </Box>*/}
                    </Grid>

                    <Grid container justify="left">
                        <FormLabel component="legend" required={true}>
                            Auction Starting and Ending Date & Time
                        </FormLabel>
                        <DialogBox
                            displayButton={true}
                            buttonText={"INSTRUCTIONS"}
                            buttonIcon={<HelpIcon />}
                            dialogBoxTitle={"Auction Date and Time Instructions"}
                            showOKButton={true}
                            dialogBoxContent={getInstructionsDialogBoxContent()}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Start Date Time Picker"
                                value={selectedStartDateTime}
                                minDateTime={minimumAuctionStartDateTime}
                                onChange={(newValue) => {
                                    setSelectedStartDateTime(newValue);
                                }}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="End Date Time Picker"
                                value={selectedEndDateTime}
                                minDateTime={endDateMinimumValue}
                                maxDateTime={endDateMaximumValue}
                                onChange={(newValue) => {
                                    setSelectedEndDateTime(newValue);
                                }}
                            />
                            <ul>
                                {!payloadValidation.minDateTimeMessage && <li> <FormLabel error={true}>{`End Date & Time must be atleast ${minimumAuctionDuration} hour after Start Date & Time`}</FormLabel></li>}
                                {!payloadValidation.maxDateTimeMessage && <li> <FormLabel error={true}>{`End Date & Time cannot be more than ${maximumAuctionDuration} days after Start Date & Time`}</FormLabel></li>}
                            </ul>
                        </LocalizationProvider>
                    </Grid>
                    {/*<Backdrop className={classes.backdrop} open={isSubmitButtonPressed}>
                                        <CircularProgress color="inherit" />
              </Backdrop>*/}
                    <Box m={1} p={1}>
                        <Button 
style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                    <br />
                </form>
            </div>
        </div>
    );
}

/*
<Box m={1} p={1}>
            <Button
style={{
                               borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}
 variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <DialogBox
              displayButton={false}
              dialogBoxInitialState={false}
              dialogBoxTitle={"FAILURE"}
              showOKButton={true}
              dialogBoxContent={'Failed to upload item details, please check your internet connection and try again later'}
            />
            <DialogBox
              displayButton={false}
              dialogBoxInitialState={false}
              dialogBoxTitle={"SUCCESS"}
              showOKButton={true}
              dialogBoxContent={'Uploaded item details, your item will be put up for auction on the selected date'}
            />
          </Box>

*/