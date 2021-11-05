import React, { useContext } from 'react'
import {
  Alert,
  Button,
  Grid,
  Input,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material'
import { imageUpload } from '../util/firebase-storage'
import { writeGraffitiData } from '../util/firebase-firestore'
import AuthContext from '../../store/auth-context'

const SubmitGraffitiForm = (props) => {
  const cityInputRef = React.useRef()
  const [alert, setAlert] = React.useState({
    open: false,
    severity: null,
    content: '',
  })
  const [progress, setProgress] = React.useState(0)
  const authCtx = useContext(AuthContext)

  const imageSelectHandler = (event) => {
    const image = event.target.files[0]

    if (!cityInputRef.current.value) {
      setAlert({
        open: true,
        severity: 'error',
        content:
          'Please fill in all the required fields before selecting the image',
      })
      setTimeout(closeAlert, 5000)
      return
    }

    if (image) {
      imageUpload(
        image,
        (progress) => {
          setProgress(progress)
        },
        (error) => {
          setAlert({
            open: true,
            severity: 'error',
            content: error,
          })
          setTimeout(closeAlert, 3000)
          setProgress(0)
        },
        (url, id) => {
          setAlert({
            open: true,
            severity: 'success',
            content: 'Image uploaded successfully',
          })
          setTimeout(closeAlert, 3000)
          setProgress(0)

          const graffitiData = {
            id: id,
            url: url,
            city: cityInputRef.current.value,
            user: authCtx.displayName,
          }

          writeGraffitiData(graffitiData)

          //props.onSubmit(graffitiData)
        }
      )
    }
  }

  const closeAlert = () => {
    setAlert({
      open: false,
      severity: '',
      content: '',
    })
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
          <Input
            id="imageInput"
            type="file"
            style={{ display: 'none' }}
            inputProps={{ accept: 'image/*' }}
            onChange={imageSelectHandler}
          />
          <label htmlFor="imageInput">
            <Button variant="contained" color="primary" component="span">
              Select File
            </Button>
          </label>
        </Grid>
        {progress > 0 && (
          <Grid item>
            <LinearProgress variant="determinate" value={progress} />
          </Grid>
        )}
        {alert.open && (
          <Grid item>
            <Alert severity={alert.severity}>{alert.content}</Alert>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default SubmitGraffitiForm
