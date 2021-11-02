import { useContext, useState } from 'react'
import Link from 'next/link'
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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const logoFlexGrow = authCtx.isLoggedIn && !isMobile ? 0 : 1
  const navLinksFlexGrow = logoFlexGrow == 0 ? 1 : 0

  return (
    <header>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            {isMobile && (
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
              <Stack
                direction="row"
                sx={{ cursor: 'pointer', flexGrow: logoFlexGrow }}
              >
                {!isMobile && <PaletteIcon sx={{ mr: 1 }} />}
                <Typography variant="h6">Graffiti Gallery</Typography>
              </Stack>
            </Link>
            {authCtx.isLoggedIn && (
              <>
                {!isMobile && (
                  <Box
                    sx={{
                      ml: 2.5,
                      pt: 0.5,
                      cursor: 'pointer',
                      flexGrow: navLinksFlexGrow,
                    }}
                  >
                    <Link href="/submit-graffiti" passHref>
                      <Typography variant="body1">Submit Graffiti</Typography>
                    </Link>
                  </Box>
                )}
                <UserMenu onLogout={logoutHandler} />
              </>
            )}
            {!authCtx.isLoggedIn && (
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
          <ListItem sx={{ width: '250px' }}>
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
