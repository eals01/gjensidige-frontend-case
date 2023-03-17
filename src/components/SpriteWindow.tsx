import styled from "styled-components"
import { Pokemon } from "../types"

interface SpriteWindowProps {
  pokemon: Pokemon
}

export default function SpriteWindow({ pokemon }: SpriteWindowProps) {
  return <SpriteWindowContainer>
    <img
      src={pokemon.sprites.other.dream_world.front_default}
      alt={`${pokemon.name} illustration`}
    />
  </SpriteWindowContainer>
}

const SpriteWindowContainer = styled.div`
  width: 100%;
  height: 45%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.2em solid #e7e7e7;
  background: radial-gradient(circle, #00000010 40%, #00000070 100%);

  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);

  > img {
    height: 90%;
    max-width: 90%;
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.5));
  }
`