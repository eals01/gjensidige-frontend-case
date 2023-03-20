import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Pokemon } from '../types';

import PlaceholderText from './PlaceholderText';
import PokemonListItem from './PokemonListItem';
import SearchField from './SearchField';
import ExpandButton from './ExpandButton';

interface PokemonListProps {
  collectedPokemon: Pokemon[];
  displayCollectedPokemon: (pokemon: Pokemon) => void;
}

export default function PokemonList({
  collectedPokemon,
  displayCollectedPokemon
}: PokemonListProps) {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [expanded, setExpanded] = useState(false);

  const filteredCollectedPokemon = collectedPokemon.filter((pokemon) =>
    pokemon.name.includes(searchPrompt)
  );

  return (
    <PokemonListContainer>
      <ExpandButton expanded={expanded} setExpanded={setExpanded} />
      {collectedPokemon.length === 0 && (
        <PlaceholderText text='Samlede pokemon vises her' />
      )}
      {collectedPokemon.length > 0 && filteredCollectedPokemon.length === 0 && (
        <PlaceholderText text='Ingen pokemon ble funnet' />
      )}
      <SearchField
        searchPrompt={searchPrompt}
        setSearchPrompt={setSearchPrompt}
      />
      <ListContainer
        as={motion.div}
        initial={{ width: 250 }}
        animate={{ width: expanded ? 500 : 250 }}
      >
        <List>
          <AnimatePresence>
            {filteredCollectedPokemon.map((pokemon) => {
              return (
                <PokemonListItem
                  key={`${pokemon.name} list item`}
                  pokemon={pokemon}
                  displayCollectedPokemon={displayCollectedPokemon}
                />
              );
            })}
          </AnimatePresence>
        </List>
      </ListContainer>
      <BottomGradient className='bruh' />
    </PokemonListContainer>
  );
}

const PokemonListContainer = styled.div`
  position: relative;
  right: -250px;
  margin-left: -250px;
  height: 100%;
  flex: 0 0 500;

  background: #e7e7e7;
`;

const ListContainer = styled.div`
  position: relative;
  height: 100%;
  max-height: calc(100vh - 120px);
  overflow-y: scroll;
`;

const List = styled.div`
  width: 250px;

  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  gap: 1em;
`;

const BottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, #e7e7e700 0%, #e7e7e7ff 75%);

  pointer-events: none;
`;
