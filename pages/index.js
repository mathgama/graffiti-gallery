import { useState, useEffect, useRef, useCallback } from 'react'
import GraffitiList from '../components/graffiti/GraffitiList'
import FeaturedGraffiti from '../components/graffiti/FeaturedGraffiti'
import { readGraffitiData } from '../components/util/firebase-firestore'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

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
  const [lastGraffitiVisible, setLastGraffitiVisible] = useState()
  const [hasMoreToFetch, setHasMoreToFetch] = useState(true)
  const [loading, setLoading] = useState(false)

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting)
        fetchGraffiti()
    })
    if (node) observer.current.observe(node)
  })

  const fetchGraffiti = async () => {
    if(!hasMoreToFetch)
      return

    setLoading(true)

    const docList = await readGraffitiData(lastGraffitiVisible)

    setLastGraffitiVisible(docList[docList.length - 1])
    setHasMoreToFetch(docList.length > 0)

    const formattedList = formatDocList(docList)

    setGraffitiList((current) => {
      return current.concat(formattedList)
    })

    setLoading(false)
  }

  const formatDocList = (docList) => 
    docList.map((doc) => {
      const {user, city, url, date} = doc.data()
      const dateObj = new Date(date)
      const formattedDate = `${
        months[dateObj.getMonth()]
      } ${dateObj.getDate()}, ${dateObj.getFullYear()}`

      return {
        id: doc.id,
        image: url,
        alt: '',
        city: city,
        uploadUser: user,
        uploadDate: formattedDate,
      }
    })

  useEffect(() => {
    fetchGraffiti()
  }, [])

  return (
    <>
      <FeaturedGraffiti
        image="https://upload.wikimedia.org/wikipedia/commons/0/0c/Banksy_Girl_and_Heart_Balloon_%282840632113%29.jpg"
        alt="Featured"
        city="New York"
        uploadUser="mathgama"
        uploadDate="Jun 10, 2019"
      />
      <GraffitiList items={graffitiList} lastElementRef={lastElementRef} />
      { loading && (
      <Box justifyContent="center" sx={{ display: 'flex' }}>
         <CircularProgress sx={{ mt: 2 }} />
      </Box>
      )}
    </>
  )
}
