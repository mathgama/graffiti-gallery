import { useContext } from 'react'
import SubmitGraffitiForm from '../components/graffiti/SubmitGraffitiForm'
import AuthContext from '../store/auth-context'
import { googleSignIn } from '../components/util/firebase-auth'

export default function SubmitGraffiti() {
  const authCtx = useContext(AuthContext)

  if (authCtx.doneFetching && !authCtx.isLoggedIn) googleSignIn()

  return <SubmitGraffitiForm />
}
