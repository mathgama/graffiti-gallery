import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import 'firebase/storage'

const app = initializeApp(process.env.firebase)
const storage = getStorage(app)

const imageUpload = (
  image,
  snapshotCallback,
  errorCallback,
  successCallback
) => {
  const storageRef = ref(storage, `images/${image.name}`)

  const uploadTask = uploadBytesResumable(storageRef, image)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      snapshotCallback(progress)
    },
    (error) => {
      errorCallback(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        successCallback(url)
      })
    }
  )
}

export { imageUpload }
