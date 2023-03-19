import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Move, Pokemon, TypeOfPokemon } from '../types';
import { fetchMove, fetchType } from '../utils';
import { lookupTypeIcon } from '../resources/typeIcons/typeIcons';

import SpriteWindow from './SpriteWindow';
import CardHeader from './CardHeader';
import MoveList from './MoveList';
import CardInformation from './CardInformation';

import grain from '../resources/grain.png';
import CardStats from './CardStats';

interface PokemonCardProps {
  pokemon?: Pokemon;
}

export default function PokemonCardFront({ pokemon }: PokemonCardProps) {
  const [type, setType] = useState<TypeOfPokemon>();
  const [moves, setMoves] = useState<Move[]>([]);
  const [cardColor, setCardColor] = useState('');

  useEffect(() => {
    if (!pokemon) return;
    const filteredMoves = pokemon.moves.filter((move) => move.version_group_details[0].level_learned_at > 0);
    Promise.all(
      filteredMoves.map(move => fetchMove(move.move.url))
    ).then(newMoves => {
      const filteredMoves = newMoves.filter((move) => move.type.name === pokemon.types[0].type.name);
      setMoves(filteredMoves.slice(0, 2));
    });

    fetchType(pokemon.types[0].type.url).then(newType => {
      setType(newType);
    });

    setCardColor(lookupTypeIcon(pokemon.types[0].type.name).color);
  }, [pokemon]);




  if (!pokemon || !type) return null;
  return (
    <PokemonCardContainer>
      <Content pokemonColor={cardColor}>
        <Grain src={grain} alt='background grain' />
        <CardHeader pokemon={pokemon} />
        <SpriteWindow pokemon={pokemon} />
        <CardInformation pokemon={pokemon} />
        <MoveList moves={moves} />
        <CardStats type={type} />
      </Content>
      <Copyright>
        ©2023 Niantic. ©2023 Pokémon / Nintendo / Creatures / GAME FREAK /
        Erlend.
      </Copyright>
    </PokemonCardContainer>
  );
}

const PokemonCardContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 20em;
  aspect-ratio: 2.5 / 3.5;

  background: #ffe75d;
  border-radius: 1em;
  padding: 1em;

  perspective: 600px;
`;

interface ContentProps {
  pokemonColor: string;
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
  `
);

const Grain = styled.img`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  border-radius: 0.25em;
  mix-blend-mode: multiply;
`;

const Copyright = styled.span`
  position: absolute;
  bottom: 10em;
  font-size: 0.03em;
  font-weight: bold;
  align-self: center;
`;
