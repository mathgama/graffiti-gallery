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

    setGraffitiList((current) => {
      return current.concat(formattedList)
    })

    setLoading(false)
  }

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
