import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import styles from './FeaturedGraffiti.module.css'

const FeaturedGraffiti = (props) => {
  return (
    <div>
      <Typography variant="h4" sx={{ my: 2 }}>
        Featured
      </Typography>
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
    </div>
  )
}

export default FeaturedGraffiti
