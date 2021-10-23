import React from 'react'
import { Alert, Button, Card, Grid, TextField, Typography } from '@mui/material'
import { imageUpload } from '../util/Firebase'

const SubmitGraffitiForm = (props) => {
  const cityInputRef = React.useRef()
  const { alert, setAlert } = React.useState(false)
  const { alertSeverity, setAlertSeverity } = React.useState()
  const { alertContent, setAlertContent } = React.useState()

  const imageSelectHandler = (event) => {
    const image = event.target.files[0]

    if (image) {
      imageUpload(
        image,
        (error) => {
          this.setAlert(true)
          this.setAlertSeverity('error')
          this.setAlertContent(error)
        },
        (url) => {
          this.setAlert(true)
          this.setAlertSeverity('success')
          this.setAlertContent('Image uploaded successfully')

          const graffitiData = {
            city: cityInputRef.current.value,
            image: url,
          }

          this.props.onSubmit(graffitiData)
        }
      )
    }
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
      {alert && <Alert severity={alertSeverity}>{alertContent}</Alert>}
    </>
  )
}

export default SubmitGraffitiForm
