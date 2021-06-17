import React, { useState } from 'react'

function EmotionInput({ emotions, setState, nextStep }) {

  const [emotionSelection, setEmotionSelection] = useState("")
  const defaultText = "...pick an emotion"

  const handleEmotionSelection = (event) => {
    setEmotionSelection(event.target.value)
  }
 
  const saveEmotionSelection = (event) => {
    setState(state => ({...state, currentEmotion: emotionSelection }))
    nextStep()
  }

  return (
    <div id="emotion-input">
      <h2>step 1: figure out how you feel</h2>
      <h2 id="question">how do you feel about anti-vaxxers?</h2>
      <div id="sentence">
        <h2>i feel</h2>
        <select onChange={handleEmotionSelection}>
          <option>{defaultText}</option>
          {
            emotions &&
            emotions.map(emotion => <option key={emotion}>{emotion}</option>)
          }
        </select>
      </div>
      <button
        className={
          `continue-button ${!emotionSelection ? "inactive" : ""}`
        }
        onClick={saveEmotionSelection}
      >
        continue
      </button>
    </div>
  )

}

export default EmotionInput
