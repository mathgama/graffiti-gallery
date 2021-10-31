import { useRouter, useContext } from 'react'
import SubmitGraffitiForm from '../components/graffiti/SubmitGraffitiForm'
import AuthContext from '../store/AuthContext.js'

export default function SubmitGraffiti() {
  const router = useRouter()
  const authCtx = useContext(AuthContext)

  const submitHandler = (graffitiData) => {}

  if (!authCtx.isLoggedIn) router.replace('/')

  return <SubmitGraffitiForm onSubmit={submitHandler} />
}
