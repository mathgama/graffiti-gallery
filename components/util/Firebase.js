import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { getDatabase } from 'firebase/database'
import { v4 as uuid } from 'uuid'

const app = initializeApp(process.env.firebase)

const storage = getStorage(app)
const database = getDatabase(app)

const imageUpload = (
  image,
  snapshotCallback,
  errorCallback,
  successCallback
) => {
  const id = uuid()

  //const storageRef = ref(storage, `images/${image.name}`)
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
