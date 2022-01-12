import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import {TextField} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Avatar, IconButton, CardMedia, CardActionArea} from "@material-ui/core";
import {
    BrowserRouter as Router, Route, Link, Switch
} from "react-router-dom";

import Display from "./displayD";



const WatchCard = props => {
  const { avatarUrl, title, subtitle, description, imageUrl } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
        <CardActionArea>
            <CardMedia style={{ height: "150px" }} image={imageUrl}  />
        </CardActionArea>
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>BID NOW </Button>

          <a href="/disp">DETAILS</a><br></br><br></br>
          <div>

              <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>
                      Enter the bid value
                  </DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                          <TextField label='Bid Price' placeholder='Enter more than $150' fullWidth required/>
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleClose} color="primary">
                          Close
                      </Button>
                      <Button onClick={handleClose} color="primary" autoFocus>
                          Submit
                      </Button>
                  </DialogActions>
              </Dialog>
          </div>
      </CardActions>
        <Router>
            <Route path = "/disp" component={Display}></Route>
        </Router>
    </Card>

  );

};

export default WatchCard;
