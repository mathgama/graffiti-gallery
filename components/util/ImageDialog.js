import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Slide,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ImageDialog = (props) => {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
      scroll="body"
    >
      <DialogTitle>
        <Grid container>
          <Grid item>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">{props.title}</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {
          //<Image src={props.image} alt={props.alt} />
        }
        <img src={props.image} alt={props.alt} />
      </DialogContent>
    </Dialog>
  )
}

export default ImageDialog
