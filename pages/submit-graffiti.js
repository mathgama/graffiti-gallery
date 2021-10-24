import SubmitGraffitiForm from '../components/graffiti/SubmitGraffitiForm'

export default function SubmitGraffiti() {
  const submitHandler = (graffitiData) => {
    console.log(graffitiData)
  }

  return <SubmitGraffitiForm onSubmit={submitHandler} />
}
