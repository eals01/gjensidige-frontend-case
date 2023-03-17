import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Move, Pokemon } from '../types'
import { fetchMove } from '../utils'

import TypeIcon from './TypeIcon'

import grain from '../resources/grain.png'
import { lookupTypeIcon } from '../resources/typeIcons/typeIcons'
import SpriteWindow from './SpriteWindow'
import CardHeader from './CardHeader'
import MoveList from './MoveList'
import CardInformation from './CardInformation'

interface PokemonCardProps {
  pokemon?: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [moves, setMoves] = useState<Move[]>([])
  const [pokemonColor, setPokemonColor] = useState('')

  useEffect(() => {
    if (!pokemon) return
    Promise.all(
      pokemon.moves.map(move => fetchMove(move.move.url))
    ).then(newMoves => {
      setMoves(newMoves.slice(0, 2))
    })

    setPokemonColor(lookupTypeIcon(pokemon.types[0].type.name).color)
  }, [pokemon])

  if (!pokemon) return null
  return (
    <PokemonCardContainer>
      <Content pokemonColor={pokemonColor}>
        <img className='grain' src={grain} alt='background grain' />
        <CardHeader pokemon={pokemon} />
        <SpriteWindow pokemon={pokemon} />
        <CardInformation pokemon={pokemon} />
        <MoveList moves={moves} />
      </Content>
      <Copyright>
        ©2023 Niantic. ©2023 Pokémon / Nintendo / Creatures / GAME FREAK /
        Erlend.
      </Copyright>
    </PokemonCardContainer>
  )
}

const PokemonCardContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  width: 20em;
  aspect-ratio: 2.5 / 3.5;

  background: #ffe75d;
  border-radius: 1em;
  padding: 1em;
`

interface ContentProps {
  pokemonColor: string
}

const Content = styled('div')(
  ({ pokemonColor }: ContentProps) => css`
    position: relative;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    background: ${pokemonColor};
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    box-shadow: 0px 0px 1px 1px rgba(46, 30, 0, 0.288) inset;

    > .grain {
      position: absolute;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      border-radius: 0.25em;
      mix-blend-mode: multiply;
    }
  `
)

const Copyright = styled.span`
  position: absolute;
  bottom: 10em;
  font-size: 0.03em;
  font-weight: bold;
  align-self: center;
`
