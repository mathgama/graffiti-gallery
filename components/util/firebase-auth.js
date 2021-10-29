import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const app = initializeApp(process.env.firebase)
const auth = getAuth()

const googleSignIn = () => {
  const provider = new GoogleAuthProvider()

  signInWithRedirect(auth, provider)
}

export { auth, googleSignIn, signOut, onAuthStateChanged }
