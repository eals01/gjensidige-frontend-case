import { useEffect, useState } from 'react'
import { fetchPokemon } from './utils'
import { Pokemon } from './types'
import { createGlobalStyle } from 'styled-components'

import PokemonCard from './components/PokemonCard'
import MovableCard from './components/MovableCard'


export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    fetchPokemon('1').then(response => setPokemon(response))
  }, [])

  return (
    <>
      <GlobalStyle />
      <MovableCard>
        <PokemonCard pokemon={pokemon} />
      </MovableCard>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html, body {
    width: 100%;
    height: 100%;
  }
  
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
  }
`