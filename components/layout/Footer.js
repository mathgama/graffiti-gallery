import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <Grid my={5} sx={{ borderTop: '1px solid #ddd', color: '#555' }}>
        <Container>
          <Box p={2}>
            <Typography variant="body1" className={styles.footerText}>
              Graffiti Gallery &copy; 2021
            </Typography>
            <Typography variant="body1" className={styles.footerText}>
              Matheus Gama
            </Typography>
          </Box>
          <Grid container align="center" justifyContent="center">
            <Grid item xs={3} md={1}>
              <a
                href="https://www.instagram.com/mathgama_/"
                className={styles.socialIcon}
              >
                <InstagramIcon fontSize="inherit" />
              </a>
            </Grid>
            <Grid item xs={3} md={1}>
              <a
                href="www.linkedin.com/in/matheus-gama-62ba3a115"
                className={styles.socialIcon}
              >
                <LinkedInIcon fontSize="inherit" />
              </a>
            </Grid>
            <Grid item xs={3} md={1}>
              <a
                href="https://github.com/mathgama"
                className={styles.socialIcon}
              >
                <GitHubIcon fontSize="inherit" />
              </a>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </footer>
  )
}

export default Footer
