import React, { useState } from "react";
import {
    TextField,
    Paper,
    Grid,
    Button,
    InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {postBidDetails} from '../APIService/ItemHandlerService';
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(85),
            width: "35ch",
        },
    },
}));

export default function BidForItem(props) {
    const classes = useStyles();
    const [payloadBidDetails, setPayloadBidDetails] = useState(
        props.payloadBidDetails
    );

    async function handlePlaceBid() {
        if (props.payloadItemDetails.basePrice >= payloadBidDetails.bidPrice) {
            alert("Bid price has to be greater than Base Price");
            setPayloadBidDetails((previousState) => ({
                ...previousState,
                bidPrice: 0.0,
            }));
        }

        else {
            if(window.confirm("Are you sure?")){
                // eslint-disable-next-line no-restricted-globals
                await postBid();
            }
        }

    }

    async function postBid(){
        try{
            setPayloadBidDetails((previousState) => ({
                ...previousState,
                timestamp : new Date().getTime(),
            }));
            console.log(`postbid timestamp ${payloadBidDetails.timestamp}`)

            const responseJson = await postBidDetails(payloadBidDetails);
            console.log(
                `getItemDetails Response from server ${JSON.stringify(responseJson)}`
            );
            alert(`Bid for item successfully at Rs.${payloadBidDetails.bidPrice} `);
        }catch(error){
            console.log(` Error on fetch ${error}`);
            alert("Error on posting Bid Details, try again later.");
        }
    }
    function handleChange(event) {
        setPayloadBidDetails((previousState) => ({
            ...previousState,
            bidPrice: event.target.value,
        }));
    }


    return (
        <div>
            <Grid container direction={"row"} spacing={5}>
                <Grid item>
                    <TextField
                        id="bidAmount"
                        type="number"
                        label="Bid Amount"
                        variant="outlined"
                        onChange={(event) => {
                            handleChange(event);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">INR</InputAdornment>
                            ),
                            inputProps: { min: props.payloadItemDetails.basePrice },
                        }}
                        required
                    />{" "}
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={handlePlaceBid}
                    >
                        Place Bid
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
