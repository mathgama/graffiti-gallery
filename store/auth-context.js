import { createContext, useState } from 'react'
import { auth } from '../components/util/firebase-auth'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  displayName: '',
  avatarUrl: '',
  doneFetching: true,
  login: (token, displayName, avatarUrl) => {},
  logout: () => {},
  finishFetch: () => {},
})

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [doneFetching, setDoneFetching] = useState(false)

  //const isLoggedIn = !!token
  const isLoggedIn = auth.currentUser

  const loginHandler = (token, displayName, avatarUrl) => {
    setToken(token)
    setDisplayName(displayName)
    setAvatarUrl(avatarUrl)
  }

  const logoutHandler = () => {
    setToken(null)
    setDisplayName(null)
    setAvatarUrl(null)
  }

  const finishFetch = () => {
    setDoneFetching(true)
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    displayName: displayName,
    avatarUrl: avatarUrl,
    doneFetching: doneFetching,
    login: loginHandler,
    logout: logoutHandler,
    finishFetch: finishFetch,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
