import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { fetchPokemon } from './utils';
import { Pokemon } from './types';

import InteractiveContainer from './components/InteractiveContainer';
import PokemonList from './components/PokemonList';
import Footer from './components/Footer';

import stadiumBackground from './resources/stadiumBackground.png';

const highestPossiblePokemonID = 649;

export default function App() {
  const [collectedPokemon, setCollectedPokemon] = useState<Pokemon[]>([]);
  const [showcasedPokemon, setShowcasedPokemon] = useState<Pokemon>();
  const [isDrawn, setIsDrawn] = useState(false);
  const [isNewDraw, setIsNewDraw] = useState(true);
  const [drawnPokemonID, setDrawnPokemonID] = useState(
    Math.ceil(Math.random() * highestPossiblePokemonID)
  );

  const drawDelay = 1100;
  function handleDraw() {
    dismissCard();
    setIsNewDraw(true);
    setTimeout(() => {
      setDrawnPokemonID(Math.ceil(Math.random() * highestPossiblePokemonID));
    }, drawDelay);
  }

  function displayPokemon(pokemon: Pokemon) {
    dismissCard();
    setIsNewDraw(false);
    setTimeout(() => {
      setShowcasedPokemon(pokemon);
      setIsDrawn(true);
    }, drawDelay);
  }

  function dismissCard() {
    if (showcasedPokemon && !collectedPokemon.includes(showcasedPokemon)) {
      setCollectedPokemon([...collectedPokemon, showcasedPokemon]);
    }
    setIsDrawn(false);
  }

  useEffect(() => {
    fetchPokemon(`${drawnPokemonID}`).then((newPokemon) => {
      setShowcasedPokemon(newPokemon);
      setIsDrawn(true);
    });
  }, [drawnPokemonID]);

  return (
    <>
      <GlobalStyle />
      <Content>
        <CardArea>
          <AnimatePresence>
            {isDrawn && (
              <InteractiveContainer
                pokemon={showcasedPokemon}
                animateFromBottom={isNewDraw}
              />
            )}
          </AnimatePresence>
        </CardArea>
        <PokemonList
          collectedPokemon={collectedPokemon}
          displayCollectedPokemon={displayPokemon}
        />
      </Content>
      <Footer handleDraw={handleDraw} />
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

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  background-image: url(${stadiumBackground});
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const CardArea = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
