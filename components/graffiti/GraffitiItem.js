import React from 'react'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import ImageDialog from '../util/ImageDialog'

const GraffitiItem = (props) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const openDialogHandler = () => {
    setIsDialogOpen(true)
  }

  const closeDialogHandler = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card onClick={openDialogHandler} ref={props.innerRef}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300px"
              image={props.image}
              alt={props.alt}
            />
            <CardContent>
              <Typography variant="h5">{props.city}</Typography>
              <Typography variant="body2">
                Uploaded by {props.uploadUser} on {props.uploadDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <ImageDialog
        open={isDialogOpen}
        onClose={closeDialogHandler}
        image={props.image}
        alt={props.alt}
        title={props.city}
      />
    </>
  )
}

export default GraffitiItem
