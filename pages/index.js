import styles from '../styles/Home.module.css'

import GraffitiList from '../components/graffiti/GraffitiList'
import FeaturedGraffiti from '../components/graffiti/FeaturedGraffiti'
import { Container } from '@mui/material'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Home() {
  const mockData = [
    {
      id: '1',
      image:
        'https://cdn.pixabay.com/photo/2016/02/19/11/31/graffiti-wall-1209761_1280.jpg',
      alt: 'Description',
      city: 'São Paulo',
      uploadUser: 'mathgama',
      uploadDate: 'Oct 18, 2021',
    },
    {
      id: '2',
      image:
        'https://catracalivre.com.br/wp-content/thumbnails/0FVc35uC_PYQOVNmYpeMsNEDnsw=/wp-content/uploads/2019/01/andrea-miramontes-toronto-street-art-canada-blogueira.jpg',
      alt: 'Description',
      city: 'Belo Horizonte',
      uploadUser: 'mathgama',
      uploadDate: 'Oct 18, 2021',
    },
    {
      id: '3',
      image:
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/ea/8a/51.jpg',
      alt: 'Description',
      city: 'Dubai',
      uploadUser: 'mathgama',
      uploadDate: 'Oct 18, 2021',
    },
  ]

  return (
    <>
      <Header />
      <Container>
        <FeaturedGraffiti
          image="/Banksy_Balloon_Girl_London.jpg"
          alt="Featured"
          city="New York"
          uploadUser="mathgama"
          uploadDate="Jun 10, 2019"
        />
        <GraffitiList items={mockData} />
      </Container>
      <Footer />
    </>
  )
}
