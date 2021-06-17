import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CaptionInput({ id, defaultValue, setInputHasChanged }) {
  const inputNo = parseInt(id[id.length - 1]) + 1
  const [value, setValue] = useState(defaultValue)
  return (
    <div>
      <label>caption #{inputNo}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setInputHasChanged(true)
        }}
      />
    </div>
  )
}

function MemeEditor({ currentMeme, nextStep, setState }) {

  const [memePreview, setMemePreview] = useState("");
  const [inputHasChanged, setInputHasChanged] = useState(false);
  const [inputs, setInputs] = useState("");

  useEffect(() => {
    const defaultCaptions = new Array(currentMeme.box_count).fill(0).map((_, i) => `caption${i + 1}`)
    setInputs(defaultCaptions)
    requestMemePreview(currentMeme.id, defaultCaptions)
  }, [currentMeme])


  const requestMemePreview = async (id, captions) => {
    const captionString = captions.map((c, i) => {
      return `boxes[${i}][text]=${c.replace(/ /g, "+")}`
    }).join('&')

    const url = `https://api.imgflip.com/caption_image?template_id=${id}&username=${process.env.REACT_APP_IMGFLIP_ID}&password=${process.env.REACT_APP_IMGFLIP_PW}&${captionString}`

    const res = await axios.post(url)
    const image = res.data.data.url
    setMemePreview(image)
  }

  const handlePreviewRequest = () => {
    const inputElements = document.querySelectorAll("#input-form input")
    const captions = Array.from(inputElements).map(input => input.value)
    requestMemePreview(currentMeme.id, captions)
    setInputHasChanged(false)
  }

  const saveMeme = () => {
    setState(state => ({...state, finalMeme: memePreview }))
    nextStep()
  }

  return (
    <div id="meme-editor">
      <div id="input-form">
        {
          inputs &&
          inputs.map((input, i) =>
            <CaptionInput
              key={`input${i}`}
              id={`input${i}`}
              defaultValue={input}
              setInputHasChanged={setInputHasChanged}
            />
          )

        }
        <button onClick={handlePreviewRequest} className={!inputHasChanged ? "inactive" : ""}>preview</button>
        <button onClick={saveMeme}>continue</button>
      </div>
      <div id="meme-preview">
        <p>preview</p>
        {
          memePreview &&
          <img src={memePreview} alt="preview of the generated meme" />
        }
      </div>
    </div>
  )
}

export default MemeEditor




// Object.keys(inputs).map(input =>
//   <CaptionInput
//     key={input}
//     id={input}
//     setInputHasChanged={setInputHasChanged}
//   />
// )