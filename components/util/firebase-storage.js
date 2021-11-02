import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase-config'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { v4 as uuid } from 'uuid'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const imageUpload = (
  image,
  snapshotCallback,
  errorCallback,
  successCallback
) => {
  const id = uuid()
  const storageRef = ref(storage, `images/${id}`)

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
        successCallback(url, id)
      })
    }
  )
}

export { imageUpload }
