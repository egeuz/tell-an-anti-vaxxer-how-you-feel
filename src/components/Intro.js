import React from 'react'

function Intro({ setState }) {

  const nextStep = () => {
    setState(state => ({ ...state, currentStep: state.currentStep + 1 }))
  }
  
  const toggleAboutModal = () => {
    setState(state => ({ ...state, aboutModalOn: true }))
  }

  return (
    <section id="intro">
      <button onClick={nextStep}>begin</button>
      <button onClick={toggleAboutModal}>what?</button>
    </section>
  )
}

export default Intro
