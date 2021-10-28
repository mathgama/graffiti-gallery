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
  startAt,
  startAfter,
  limit,
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
}

const readGraffitiData = async (lastVisible) => {
  let q

  if (lastVisible)
    q = query(
      collection(database, 'graffiti'),
      orderBy('date', 'desc'),
      startAfter(lastVisible),
      limit(2)
    )
  else
    q = query(
      collection(database, 'graffiti'),
      orderBy('date', 'desc'),
      limit(2)
    )

  const querySnapshot = await getDocs(q)

  const graffitiList = []

  querySnapshot.forEach((doc) => {
    graffitiList.push(doc)
  })

  return graffitiList
}

export { imageUpload, writeGraffitiData, readGraffitiData }
