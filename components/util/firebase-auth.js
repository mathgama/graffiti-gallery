import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase-config'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const app = initializeApp(firebaseConfig)
const auth = getAuth()

const googleSignIn = () => {
  const provider = new GoogleAuthProvider()

  signInWithRedirect(auth, provider)
}

export { auth, googleSignIn, signOut, onAuthStateChanged }
