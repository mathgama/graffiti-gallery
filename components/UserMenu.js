import { useContext, useState } from 'react'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import AuthContext from '../store/auth-context'

const UserMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const authCtx = useContext(AuthContext)

  const menuOpenHandler = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const menuCloseHandler = () => {
    setAnchorEl(null)
  }

  const open = !!anchorEl

  return (
    <>
      <Button
        color="inherit"
        startIcon={
          authCtx.avatarUrl ? (
            <Avatar src={authCtx.avatarUrl} sx={{ width: 30, height: 30 }} />
          ) : (
            <Avatar sx={{ width: 30, height: 30 }}>
              <PersonIcon />
            </Avatar>
          )
        }
        //sx={{ maxWidth: '120px' }}
        onClick={menuOpenHandler}
      >
        <Box
          component="span"
          sx={{
            width: '120px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {authCtx.displayName}
        </Box>
      </Button>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={menuCloseHandler}
      >
        <MenuItem onClick={props.onLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
