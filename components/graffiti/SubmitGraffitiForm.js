import React from 'react'
import { Button, Card, Grid, TextField, Typography } from '@mui/material'

const SubmitGraffitiForm = (props) => {
  const cityInputRef = React.useRef()

  const imageSelectHandler = (event) => {
    const graffitiData = {
      city: cityInputRef.current.value,
      image: event.target.value,
    }

    props.onSubmit(graffitiData)
  }

  return (
    <>
      <Typography variant="h4" sx={{ my: 2 }}>
        Submit Graffiti
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            required
            id="cityInput"
            label="City"
            inputRef={cityInputRef}
          />
        </Grid>
        <Grid item>
          <input
            style={{ display: 'none' }}
            id="imageInput"
            type="file"
            onChange={imageSelectHandler}
          />
          <label htmlFor="imageInput">
            <Button variant="contained" color="primary" component="span">
              Select File
            </Button>
          </label>
        </Grid>
      </Grid>
    </>
  )
}

export default SubmitGraffitiForm
