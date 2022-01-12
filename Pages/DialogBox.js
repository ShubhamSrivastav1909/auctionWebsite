import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogBox(props) {
  
  console.log(`props.dialogBoxTitle ${props.dialogBoxTitle}`);
  const dialogBoxInitialState = props.dialogBoxInitialState ? true : false;
  console.log(`dialogBoxInitialState ${dialogBoxInitialState}`);
  const [open, setOpen] = React.useState(dialogBoxInitialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(`${props.dialogBoxTitle} open ${open}`);
  return (
    <div>
      {props.displayButton && <Button variant="outlined" color="primary" onClick={handleClickOpen} endIcon={props.buttonIcon}>
        {props.buttonText}
      </Button>}
      {open && 'OPEN IS TRUE'}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogBoxTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.dialogBoxContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {props.showOKButton && <Button onClick={handleClose} color="primary">
            OKAY
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}