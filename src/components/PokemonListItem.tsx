import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Pokemon } from '../types';

interface PokemonListItemProps {
  pokemon: Pokemon;
  displayCollectedPokemon: (pokemon: Pokemon) => void;
}

export default function PokemonListItem({
  pokemon,
  displayCollectedPokemon
}: PokemonListItemProps) {
  return (
    <PokemonListItemContainer
      as={motion.div}
      layout
      initial={{ y: document.body.offsetHeight }}
      animate={{ y: 0 }}
      exit={{ y: document.body.offsetHeight }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={() => displayCollectedPokemon(pokemon)}
    >
      <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
      <span>{pokemon.name}</span>
    </PokemonListItemContainer>
  );
}

const PokemonListItemContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #c6c6c630;
  text-align: center;

  &:hover {
    background: #c6c6c650;
  }

  > span {
    position: absolute;
    bottom: 0;
    text-transform: capitalize;
    font-weight: bold;
    color: #1f1f1f;
  }
`;
