import {
  AppBar,
  Button,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import PaletteIcon from '@mui/icons-material/Palette'

const HideOnScroll = (props) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  )
}

const Header = () => {
  return (
    <header>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <PaletteIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Graffiti Gallery
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </header>
  )
}

export default Header
