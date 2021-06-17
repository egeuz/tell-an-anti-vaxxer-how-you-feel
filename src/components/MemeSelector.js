import React, { useState, useEffect } from 'react'
import shuffle from '../helper/shuffle'

function MemeSelector({ memes, currentEmotion, setState, nextStep }) {

  const NUM_MEME_LIST = 10;
  const [memeList, setMemeList] = useState("")
  const [selectedMeme, setSelectedMeme] = useState("")

  useEffect(() => {
    if (memes) {
      shuffle(memes)
      setMemeList(memes.slice(0, NUM_MEME_LIST))
    }
  }, [memes, currentEmotion])

  const handleMemeSelection = (node) => {
    document.querySelectorAll(".meme").forEach(node => node.classList.remove("selected"))
    node.classList.add("selected")
  }

  const saveMemeSelection = () => {
    setState(state => ({ ...state, currentMeme: selectedMeme }))
    nextStep()
  }

  return (
    <div id="meme-selector">
      <div>
        <h2>step 2: express how you feel (with memes)</h2>
        <h3>first, let's pick a format</h3>
        <h3>suggesting some <strong>{currentEmotion}</strong> meme formats</h3>
        <p>[place more options/feedback input here soon]</p>
      </div>
      <div id="selection">
        {
          memeList &&
          memeList.map((meme, i) =>
            <div
              key={meme.name}
              className="meme"
              style={{ backgroundImage: `url(${meme.url})` }}
              onClick={(event) => {
                setSelectedMeme({ ...meme })
                handleMemeSelection(event.target)
              }}
            >
              <span>{meme.name}</span>
            </div>
          )
        }
      </div>
      <button
        className={
          `continue-button ${!selectedMeme ? "inactive" : ""}`
        }
        onClick={saveMemeSelection}
      >
        continue
    </button>
    </div>
  )
}

export default MemeSelector
