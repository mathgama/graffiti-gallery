import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore'

const app = initializeApp(process.env.firebase)
const database = getFirestore(app)

const writeGraffitiData = async (graffitiData) => {
  try {
    await addDoc(collection(database, 'graffiti'), {
      url: graffitiData.url,
      city: graffitiData.city,
      user: graffitiData.user,
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

export { writeGraffitiData, readGraffitiData }
