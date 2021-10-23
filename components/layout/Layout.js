import { Container } from '@mui/material'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <>
      <Header />
      <Container>{props.children}</Container>
      <Footer />
    </>
  )
}

export default Layout
