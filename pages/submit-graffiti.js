import { useContext } from 'react'
import { useRouter } from 'next/router'
import SubmitGraffitiForm from '../components/graffiti/SubmitGraffitiForm'
import AuthContext from '../store/auth-context'
import { googleSignIn } from '../components/util/firebase-auth'

export default function SubmitGraffiti() {
  const authCtx = useContext(AuthContext)
  const router = useRouter()

  if (authCtx.doneFetching && !authCtx.isLoggedIn) router.push('/') //googleSignIn()

  return <SubmitGraffitiForm />
}
