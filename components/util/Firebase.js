import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

const app = initializeApp(process.env.firebase)

const storage = getStorage(app)
const database = getFirestore(app)

const imageUpload = (
  image,
  snapshotCallback,
  errorCallback,
  successCallback
) => {
  const id = uuid()
  const storageRef = refStorage(storage, `images/${id}`)

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

const writeGraffitiData = async (graffitiData) => {
  try {
    await addDoc(collection(database, 'graffiti'), {
      url: graffitiData.url,
      city: graffitiData.city,
      user: 'admin',
      date: new Date().toJSON(),
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }

  /*
  const databaseRef = refDatabase(database, 'graffiti/' + graffitiData.id)

  setDatabase(databaseRef, {
    url: graffitiData.url,
    city: graffitiData.city,
    user: 'admin',
    date: new Date().toJSON(),
  })
  */
}

const readGraffitiData = async () => {
  const q = query(collection(database, 'graffiti'), orderBy('date', 'desc'))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
}

export { imageUpload, writeGraffitiData, readGraffitiData }
