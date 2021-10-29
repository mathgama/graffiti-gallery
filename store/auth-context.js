import { createContext, useState } from 'react'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  displayName: '',
  avatarUrl: '',
  login: (token, displayName, avatarUrl) => {},
  logout: () => {},
})

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)

  const isLoggedIn = !!token

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

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    displayName: displayName,
    avatarUrl: avatarUrl,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
