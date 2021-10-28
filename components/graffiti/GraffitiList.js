import { Grid, Typography } from '@mui/material'
import GraffitiItem from './GraffitiItem'

const GraffitiList = (props) => {
  return (
    <div>
      <Typography variant="h4" sx={{ my: 2 }}>
        Latest Submissions
      </Typography>
      <Grid container spacing={2}>
        {props.items.map((graffiti, index) => {
          if (index + 1 === props.items.length)
            return (
              <GraffitiItem
                key={graffiti.id}
                image={graffiti.image}
                alt={graffiti.description}
                city={graffiti.city}
                uploadUser={graffiti.uploadUser}
                uploadDate={graffiti.uploadDate}
                innerRef={props.lastElementRef}
              />
            )
          else
            return (
              <GraffitiItem
                key={graffiti.id}
                image={graffiti.image}
                alt={graffiti.description}
                city={graffiti.city}
                uploadUser={graffiti.uploadUser}
                uploadDate={graffiti.uploadDate}
              />
            )
        })}
      </Grid>
    </div>
  )
}

export default GraffitiList
