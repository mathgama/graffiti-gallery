import styles from './GraffitiItem.module.css'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material'

function MeetupItem(props) {
  return (
    <Grid item xs={12} md={6}>
      <Card>
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
  )
}

export default MeetupItem
