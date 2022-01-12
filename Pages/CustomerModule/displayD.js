/*
  For testing, bids will be placed from userID (customer) 182500.
  Remove comment from line 40.
*/



import React, { useState, useEffect } from "react";
import { TextField, Paper,Button } from "@material-ui/core";
import { payloadItemWatch } from "../../Utils/ConstantsUtils";
import { getItemDetails } from "../../APIService/ItemHandlerService";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Grid,
} from "@material-ui/core";
import BidForItem from '../BidForItem';
const useStyles = makeStyles({
    table: {
        minWidth: 550,
    },
    bidButton: {
        justifyContent: "center",
        margin: '0 auto'
    },
});

export default function ItemWatchDisplayDetails(props) {

    const classes = useStyles();
    const [itemID, setItemID] = useState("");
    const [okButtonPressed, setOkButtonPressed]=useState(false);
    const [payloadItemDetails, setPayloadItemDetails] = useState(payloadItemWatch);
    const [payloadBidDetails, setPayloadBidDetails] = useState({
        bidID : "",
        userID : "182500", //props.userID,
        itemID : "i@232356",
        bidPrice : 150,
        timestamp : 0,
    });

    useEffect(()=>{

    },[okButtonPressed]);
    function handleChange(event) {
        setItemID(event.target.value);


    }

    function handleReset(event) {
        setItemID("");
    }

    async function handleSubmit() {
        try {
            const responseJson = await getItemDetails("watch", itemID);
            setPayloadItemDetails(responseJson);

            console.log(
                `getItemDetails Response from server ${JSON.stringify(responseJson)}`
            );
        } catch (error) {
            console.log(` Error on fetch ${error}`);
            alert("Error on Getting Item Details, try again later.");
        }
    }
    function createData(name, value) {
        return { name, value };
    }
    function handleBid() {
        setPayloadBidDetails((previousState) => ({
            ...previousState,
            itemID : itemID,
            bidID : `${previousState.userID+"_"+itemID}`
        }));
        setOkButtonPressed(true);
    };

    const rows = [
        createData("Item Name","Brass Round Crown" ),
        createData("Base Price", "$149.99"),
        createData("Brand Name", "Crown"),
        createData("Source", "purchased"),
        createData("Weight", "480g"),
        createData("Item Age (Yrs) ", "150 yrs"),
        createData("WorkingCondition", "no"),
        createData("Auction Starting Date & Time ", "Thu May 13 2021 05:30:00 GMT+0530 (India Standard Time)"),
        createData("Auction Ending Date & Time", "Thu May 20 2021 05:30:00 GMT+0530 (India Standard Time)"),
    ];
    console.log(`Auction Starting Date & Time ${new Date(payloadItemDetails.startingDateTime)}`);
    console.log(`Auction Ending Date & Time ${new Date(payloadItemDetails.endingDateTime)}`);
    return (
        <div>
            <div>
               <header> <h1>Item Watch Display Details</h1> </header>

            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" align="justify">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {okButtonPressed && <BidForItem payloadBidDetails={payloadBidDetails} payloadItemDetails={payloadItemDetails}/>}
                <Button
                    style={{
                        borderRadius:35,  backgroundColor:"#950740", padding:"18px 36px", fontSize:"18px"}}

                    className={classes.bidButton}
                    variant="contained"
                    color="secondary"
                    onClick={handleBid}
                >
                    Bid for this Item
                </Button>

            </TableContainer>
            <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                style={{
                    textAlign: "center",
                }}
                container
                justify="center"
            >


            </Grid>


        </div>
    );
}
