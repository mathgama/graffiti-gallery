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
  where,
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
      featured: false,
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
      where('featured', '==', false),
      orderBy('date', 'desc'),
      startAfter(lastVisible),
      limit(4)
    )
  else
    q = query(
      collection(database, 'graffiti'),
      where('featured', '==', false),
      orderBy('date', 'desc'),
      limit(4)
    )

  const querySnapshot = await getDocs(q)

  const graffitiList = []

  querySnapshot.forEach((doc) => {
    graffitiList.push(doc)
  })

  return graffitiList
}

const readFeaturedGraffiti = async () => {
  const q = query(
    collection(database, 'graffiti'),
    where('featured', '==', true)
  )

  const querySnapshot = await getDocs(q)

  let featuredGraffiti = {}

  querySnapshot.forEach((doc) => {
    featuredGraffiti = doc
  })

  return featuredGraffiti
}

export { writeGraffitiData, readGraffitiData, readFeaturedGraffiti }
