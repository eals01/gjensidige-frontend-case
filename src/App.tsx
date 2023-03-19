import { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { fetchPokemon } from './utils'
import { Pokemon } from './types'

import MovableCard from './components/MovableCard'

export default function App() {
  const [drawnPokemonID, setDrawnPokemonID] = useState(Math.ceil(Math.random() * 100))
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [isDrawn, setIsDrawn] = useState(false)

  useEffect(() => {
    fetchPokemon(`${drawnPokemonID}`).then(newPokemon => {
      setPokemon(newPokemon)
      setIsDrawn(true)
    })
  }, [drawnPokemonID])

  function handleDraw() {
    setDrawnPokemonID(Math.ceil(Math.random() * 100))
  }

  function handleDismiss() {
    setIsDrawn(false)
  }

  return (
    <>
      <GlobalStyle />
      <AnimatePresence>
        {isDrawn && <MovableCard pokemon={pokemon} />}
      </AnimatePresence>
      <Footer>
        <button onClick={handleDraw}>Draw</button>
        <button onClick={handleDismiss}>Dismiss</button>
      </Footer>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html, body, #root {
    width: 100%;
    height: 100vh;

    overflow: hidden;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: sans-serif;
  }
`

const Footer = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4em;
  background: #e4000f;

  > button {
    padding: 1em;
  }
`