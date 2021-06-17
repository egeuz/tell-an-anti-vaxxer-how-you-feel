import React, {useState, useEffect} from 'react'


function BackgroundImage() {

  const [bg, setBG] = useState("")
  const NUM_BACKGROUNDS = 10;

  const setRandomBG = () => {
    setBG(Math.floor(Math.random() * NUM_BACKGROUNDS))
  }

  useEffect(() => {
    setRandomBG()
  }, [])

  return (
    <div 
      id="background-image" 
      className={`bg-${bg}`}
    />
  )
}

export default BackgroundImage
