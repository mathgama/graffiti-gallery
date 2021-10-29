import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import ImageDialog from '../ImageDialog'

const FeaturedGraffiti = (props) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const openDialogHandler = () => {
    setIsDialogOpen(true)
  }

  const closeDialogHandler = () => {
    setIsDialogOpen(false)
  }

  return (
    <div>
      <Typography variant="h4" sx={{ my: 2 }}>
        Featured
      </Typography>
      <Card onClick={openDialogHandler}>
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
      <ImageDialog
        open={isDialogOpen}
        onClose={closeDialogHandler}
        image={props.image}
        alt={props.alt}
        title={props.city}
      />
    </div>
  )
}

export default FeaturedGraffiti
