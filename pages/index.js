import styles from '../styles/Home.module.css'

import GraffitiItem from '../components/graffiti/GraffitiItem'
import { Grid } from '@mui/material'

export default function Home() {
  return (
    <Grid container>
      <GraffitiItem
        image="https://cdn.pixabay.com/photo/2016/02/19/11/31/graffiti-wall-1209761_1280.jpg"
        alt="Description"
        city="São Paulo"
        uploadUser="mathgama"
        uploadDate="Oct 18, 2021"
      />
      <GraffitiItem
        image="https://cdn.pixabay.com/photo/2016/02/19/11/31/graffiti-wall-1209761_1280.jpg"
        alt="Description"
        city="São Paulo"
        uploadUser="mathgama"
        uploadDate="Oct 18, 2021"
      />
      <GraffitiItem
        image="https://cdn.pixabay.com/photo/2016/02/19/11/31/graffiti-wall-1209761_1280.jpg"
        alt="Description"
        city="São Paulo"
        uploadUser="mathgama"
        uploadDate="Oct 18, 2021"
      />
    </Grid>
  )
}
