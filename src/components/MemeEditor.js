import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CaptionInput({ id, setInputs }) {
  const inputNo = parseInt(id[id.length - 1]) + 1
  const [value, setValue] = useState(`caption #${inputNo}`)
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        setInputs(inputs => {
          const i = inputs;
          i[id] = e.target.value;
          console.log(i)
          return i;
        })
      }}
    />
  )
}

function MemeEditor({ currentMeme, nextStep }) {

  const [memePreview, setMemePreview] = useState("");
  const [inputHasChanged, setInputHasChanged] = useState(false);
  const [inputs, setInputs] = useState("");

  useEffect(() => {
    const initCaptionInputs = () => {
      let inputs = {}
      for (let i = 0; i < currentMeme.box_count; i++) {
        inputs[`input${i}`] = `caption #${i + 1}`;
      }
      setInputs(inputs);
    }

    console.log(currentMeme)

    const initMemePreview = async () => {

      const boxes = Object.values(inputs).map(input => {
        return {
          text: input
        }
      })

      const reqbody = {
        template_id: currentMeme.id,
        username: process.env.REACT_APP_IMGFLIP_ID,
        password: process.env.REACT_APP_IMGFLIP_PW,
        boxes

      }
      const res = await axios.post('https://api.imgflip.com/caption_image', reqbody)
      console.log(res)
      // setMemePreview(preview);
    }

    initCaptionInputs()
    initMemePreview()

  }, [currentMeme])



  return (
    <div id="meme-editor">
      <div id="input-form">
        {
          inputs &&
          Object.keys(inputs).map(input => <CaptionInput key={input} id={input} inputs={inputs} setInputs={setInputs} />)
        }
      </div>
      <div id="meme-preview"></div>
    </div>
  )
}

export default MemeEditor
