import React, { useState, useEffect } from 'react'
//components
import BackgroundImage from './components/BackgroundImage'
import Header from './components/Header'
import Intro from './components/Intro'
import EmotionInput from './components/EmotionInput'
import MemeSelector from './components/MemeSelector'
import MemeEditor from './components/MemeEditor'
import NextSteps from './components/NextSteps'
//helper methods
import shuffle from './helper/shuffle'
//data
import memes from './data/memes.json'
import emotions from './data/emotions.json'
/* list of emotions from EARL (emotion annotation and representation language) -- https://web.archive.org/web/20080411092724/http://emotion-research.net/projects/humaine/earl */


function App() {

  /*** app state ***/
  const [state, setState] = useState("")

  useEffect(() => {
    shuffle(emotions)
    const state = {
      emotions,
      memes,
      currentStep: 0,
      currentEmotion: ""
    }
    setState(state)
  }, [])

  const nextStep = () => {
    setState(state => ({ ...state, currentStep: state.currentStep + 1 }))
  }

  const prevStep = () => {
    setState(state => ({ ...state, currentStep: state.currentStep - 1 }))
  }

  // console.log(emotions)

  //TODO: 
  // anti-vaxxers make me feel ... interface
  // meme picker based on selected emotion
  // filling text in the meme template
  // submit & what happens next flow
  return (
    <div id="main">
      <BackgroundImage />
      <Header />
      <div id="app">
        {
          state.currentStep === 0 ?
            <Intro
              setState={setState}
              nextStep={nextStep}
              prevStep={prevStep}
            /> :
            state.currentStep === 1 ?
              <EmotionInput
                emotions={state.emotions}
                setState={setState}
                nextStep={nextStep}
                prevStep={prevStep}
              /> :
              state.currentStep === 2 ?
                <MemeSelector
                  memes={state.memes}
                  currentEmotion={state.currentEmotion}
                  setState={setState}
                  nextStep={nextStep}
                  prevStep={prevStep}
                /> :
                state.currentStep === 3 ?
                  <MemeEditor
                    currentMeme={state.currentMeme}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  /> :
                  state.currentStep === 4 ?
                    <NextSteps
                      prevStep={prevStep}
                    /> :
                    <React.Fragment />
        }
      </div>
    </div>
  )
}

export default App

