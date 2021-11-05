import { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  AppBar,
  Button,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Drawer,
  ListItem,
  List,
  ListItemText,
  IconButton,
  ListItemIcon,
} from '@mui/material'
import PaletteIcon from '@mui/icons-material/Palette'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'
import UploadIcon from '@mui/icons-material/Upload'
import {
  auth,
  googleSignIn,
  signOut,
  onAuthStateChanged,
} from '../util/firebase-auth'
import AuthContext from '../../store/auth-context'
import UserMenu from '../UserMenu'
import { Box } from '@mui/system'

const HideOnScroll = (props) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  )
}

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const authCtx = useContext(AuthContext)
  const router = useRouter()

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

  const drawerItemClickHandler = (route) => {
    router.push(route)
    setOpenDrawer(false)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <header>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            {isMobile && authCtx.isLoggedIn && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpenDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link href="/" passHref>
              <Stack direction="row" sx={{ cursor: 'pointer' }}>
                {!isMobile && <PaletteIcon sx={{ mr: 1 }} />}
                <Typography variant="h6">Graffiti Gallery</Typography>
              </Stack>
            </Link>
            {authCtx.isLoggedIn && !isMobile && (
              <Box
                sx={{
                  ml: 2.5,
                  pt: 0.5,
                  cursor: 'pointer',
                }}
              >
                <Link href="/submit-graffiti" passHref>
                  <Typography variant="body1">Submit Graffiti</Typography>
                </Link>
              </Box>
            )}
            <Box flexGrow={1} />
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
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem
            button
            sx={{ width: '250px' }}
            onClick={() => drawerItemClickHandler('/submit-graffiti')}
          >
            <ListItemIcon>
              <UploadIcon />
            </ListItemIcon>
            <ListItemText primary="Submit Graffiti" />
          </ListItem>
        </List>
      </Drawer>
      <Toolbar />
    </header>
  )
}

export default Header
