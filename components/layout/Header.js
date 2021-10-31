import { useContext } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Button,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import PaletteIcon from '@mui/icons-material/Palette'
import PersonIcon from '@mui/icons-material/Person'
import {
  auth,
  googleSignIn,
  signOut,
  onAuthStateChanged,
} from '../util/firebase-auth'
import AuthContext from '../../store/auth-context'
import UserMenu from '../UserMenu'
import { Box } from '@mui/system'
import styles from './Header.module.css'

const HideOnScroll = (props) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  )
}

const Header = () => {
  const authCtx = useContext(AuthContext)

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser)
      authCtx.login(
        currentUser.accessToken,
        currentUser.displayName,
        currentUser.photoURL
      )
    else authCtx.logout()

    authCtx.finishFetch()
  })

  const logoutHandler = () => {
    signOut(auth)
  }

  return (
    <header>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Link href="/" passHref>
              <Stack
                direction="horizontal"
                className={styles.logo}
                sx={{ flexGrow: 1 }}
              >
                <PaletteIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Graffiti Gallery
                </Typography>
              </Stack>
            </Link>
            {authCtx.isLoggedIn ? (
              <UserMenu onLogout={logoutHandler} />
            ) : (
              <Button
                startIcon={<PersonIcon />}
                color="inherit"
                variant="outlined"
                onClick={googleSignIn}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </header>
  )
}

export default Header
