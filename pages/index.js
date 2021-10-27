import { useState, useEffect, useCallback } from 'react'
import GraffitiList from '../components/graffiti/GraffitiList'
import FeaturedGraffiti from '../components/graffiti/FeaturedGraffiti'

import { readGraffitiData } from '../components/util/Firebase'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function Home() {
  const [graffitiList, setGraffitiList] = useState([])

  const fetchGraffiti = useCallback(async () => {
    const docList = await readGraffitiData()

    const formattedList = docList.map((doc) => {
      const data = doc.data()
      const uploadDate = new Date(data.date)
      const formattedDate = `${
        months[uploadDate.getMonth()]
      } ${uploadDate.getDate()}, ${uploadDate.getFullYear()}`

      return {
        id: doc.id,
        image: data.url,
        alt: '',
        city: data.city,
        uploadUser: data.user,
        uploadDate: formattedDate,
      }
    })

    setGraffitiList(formattedList)
  }, [])

  useEffect(() => {
    fetchGraffiti()
  }, [fetchGraffiti])

  return (
    <>
      <FeaturedGraffiti
        image="https://upload.wikimedia.org/wikipedia/commons/0/0c/Banksy_Girl_and_Heart_Balloon_%282840632113%29.jpg"
        alt="Featured"
        city="New York"
        uploadUser="mathgama"
        uploadDate="Jun 10, 2019"
      />
      <GraffitiList items={graffitiList} />
    </>
  )
}
