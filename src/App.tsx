import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { fetchPokemon } from './utils';
import { Pokemon } from './types';

import MovableCard from './components/MovableCard';
import PokemonList from './components/PokemonList';

export default function App() {
  const [collectedPokemon, setCollectedPokemon] = useState<Pokemon[]>([]);
  const [drawnPokemonID, setDrawnPokemonID] = useState(Math.ceil(Math.random() * 100));
  const [showcasedPokemon, setShowcasedPokemon] = useState<Pokemon>();
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    fetchPokemon(`${drawnPokemonID}`).then(newPokemon => {
      setShowcasedPokemon(newPokemon);
      setIsDrawn(true);
    });
  }, [drawnPokemonID]);

  function handleDraw() {
    const highestPossiblePokemonID = 649;
    handleDismiss();
    setTimeout(() => {
      setDrawnPokemonID(Math.ceil(Math.random() * highestPossiblePokemonID));
    }, 2100);
  }

  function handleDismiss() {
    if (showcasedPokemon && !collectedPokemon.includes(showcasedPokemon)) {
      setCollectedPokemon([...collectedPokemon, showcasedPokemon]);
    }
    setIsDrawn(false);
  }

  function displayCollectedPokemon(pokemon: Pokemon) {
    handleDismiss();
    setTimeout(() => {
      setShowcasedPokemon(pokemon);
      setIsDrawn(true);
    }, 2100);

  }

  return (
    <>
      <GlobalStyle />
      <Content>
        <CardShowcase>
          <AnimatePresence>
            {isDrawn && <MovableCard pokemon={showcasedPokemon} />}
          </AnimatePresence>
        </CardShowcase>
        <PokemonList
          collectedPokemon={collectedPokemon}
          displayCollectedPokemon={displayCollectedPokemon}
        />
      </Content>
      <Footer>
        <DrawButton onClick={handleDraw}>Trekk nytt kort</DrawButton>
      </Footer>
    </>
  );
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

    font-family: sans-serif;
  }
`;

const CardShowcase = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4em;
  background: #e4000f;
`;

const DrawButton = styled.button`
  padding: 1em;
  font-weight: bold;
  border: none;
  border-radius: 0.25em;

  &:hover {
    background: #e7e7e7
  }
`;