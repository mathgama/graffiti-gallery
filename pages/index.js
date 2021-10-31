import { useState, useEffect, useRef, useCallback } from 'react'
import GraffitiList from '../components/graffiti/GraffitiList'
import FeaturedGraffiti from '../components/graffiti/FeaturedGraffiti'
import { readGraffitiData, readFeaturedGraffiti } from '../components/util/firebase-firestore'
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
  const [featuredGraffiti, setFeaturedGraffiti] = useState({loading: true})

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting)
        fetchGraffitiList()
    })
    if (node) observer.current.observe(node)
  })

  const fetchGraffitiList = async () => {
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

    const fetchFeaturedGraffiti = async () => {
      const doc = await readFeaturedGraffiti()

      const {user, city, url, date} = doc.data()
      const dateObj = new Date(date)
      const formattedDate = `${
        months[dateObj.getMonth()]
      } ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  
      setFeaturedGraffiti({
        image: url,
        alt: "Featured",
        city: city,
        uploadUser: user, 
        uploadDate: formattedDate,
        loading: false
      })
    }

  useEffect(() => {
    fetchGraffitiList()
    fetchFeaturedGraffiti()
  }, [])

  return (
    <>
      { featuredGraffiti.loading ? (
        <Box justifyContent="center" sx={{ display: 'flex' }}>
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      ) : (
        <FeaturedGraffiti
          image={featuredGraffiti.image}
          alt={featuredGraffiti.alt}
          city={featuredGraffiti.city}
          uploadUser={featuredGraffiti.uploadUser}
          uploadDate={featuredGraffiti.uploadDate}
        />
      )}
      <GraffitiList items={graffitiList} lastElementRef={lastElementRef} />
      { loading && (
      <Box justifyContent="center" sx={{ display: 'flex' }}>
         <CircularProgress sx={{ mt: 2 }} />
      </Box>
      )}
    </>
  )
}
