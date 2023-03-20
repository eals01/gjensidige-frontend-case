import { motion } from 'framer-motion';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Pokemon } from '../types';

import pokemonCardBack from '../resources/pokemonCardBack.png';
import PokemonCardFront from './PokemonCard/PokemonCardFront';

interface InteractiveContainerProps {
  pokemon?: Pokemon;
  animateFromBottom: boolean;
}

export default function InteractiveContainer({
  pokemon,
  animateFromBottom
}: InteractiveContainerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLImageElement>(null);

  function turnCard() {
    setTimeout(() => {
      const card = cardRef.current;
      const back = backRef.current;
      if (card && back) {
        card.style.transition = '1s';
        card.style.transform = 'perspective(500px) rotateY(0deg)';
        setTimeout(() => {
          back.style.display = 'none';
        }, 300);
      }
    }, 350);
  }

  const moveDelay = 2000;
  setTimeout(() => {
    enableMove();
  }, moveDelay);

  const bottomAnimation = {
    initial: { y: document.body.offsetHeight },
    animate: { y: 0 },
    exit: { y: -document.body.offsetHeight, transition: { duration: 1 } },
    transition: { duration: 2, type: 'spring' },
    onAnimationStart: turnCard
  };
  const topAnimation = {
    initial: { y: -document.body.offsetHeight },
    animate: { y: 0 },
    exit: { y: -document.body.offsetHeight, transition: { duration: 1 } },
    transition: { duration: 2, type: 'spring' }
  };
  const animation = animateFromBottom ? bottomAnimation : topAnimation;

  function handleMouseMove(card: HTMLDivElement, glare: HTMLDivElement) {
    return function (event: MouseEvent) {
      const { clientX, clientY } = event;
      const x = clientX - card.offsetLeft;
      const y = clientY - card.offsetTop;
      const height = card.offsetHeight;
      const width = card.offsetWidth;

      card.style.transition = 'none';
      card.style.transform = `
        perspective(500px)
        rotateX(${(y - height / 2) / 10}deg)
        rotateY(${(width / 2 - x) / 10}deg)
      `;
      glare.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255,255,255,1) 5%,
            rgba(255,255,255,0.5) 30%, 
            rgba(59,28,5,0.4) 100%
        )
      `;
    };
  }

  function handleMouseOut(card: HTMLDivElement, glare: HTMLDivElement) {
    return function () {
      card.style.transition = 'transform 1s';
      card.style.transform = `rotateX(0deg)`;
      glare.style.background =
        'radial-gradient(rgba(255,255,255,0.8) 20%, rgba(59,28,5,0.4) 100%)';
    };
  }

  function enableMove() {
    if (cardRef.current && glareRef.current) {
      const card = cardRef.current;
      const glare = glareRef.current;
      const onMouseMove = handleMouseMove(card, glare);
      const onMouseOut = handleMouseOut(card, glare);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseout', onMouseOut);
    }
  }

  if (!pokemon) return null;
  return (
    <motion.div {...animation}>
      <PokemonCard ref={cardRef} flipped={animateFromBottom}>
        <PokemonCardFront pokemon={pokemon} />
        {animateFromBottom && (
          <PokemonCardBack
            ref={backRef}
            src={pokemonCardBack}
            alt='pokemon card back'
          />
        )}
        <Glare ref={glareRef} />
      </PokemonCard>
    </motion.div>
  );
}

interface PokemonCardProps {
  flipped: boolean;
}

const PokemonCard = styled('div')(
  ({ flipped }: PokemonCardProps) => css`
    position: relative;
    transform: ${flipped
      ? 'perspective(500px) rotateY(180deg)'
      : 'perspective(500px)'};
    transition: 2s;
  `
);

const PokemonCardBack = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;
`;

const Glare = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 1em;
  opacity: 0.5;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 10%,
    rgba(59, 28, 5, 0.4) 100%
  );
`;
