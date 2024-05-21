
import { useRef, useState } from 'react'
import './App.css'
import CustomFormSubmission from './components/CustomFormSubmission'
import DynamicFormFocus from './components/DyanamicFormFocus'
import RealTimeValidationForm from './components/RealTimeValidation'

function App() {


  return (
    <>
      <CustomFormSubmission/>
      <DynamicFormFocus/>
      <RealTimeValidationForm/>
    </>
  )
}

export default App
