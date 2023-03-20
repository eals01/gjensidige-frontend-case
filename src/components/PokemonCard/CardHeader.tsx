import styled from 'styled-components';
import { Pokemon } from '../../types';

import TypeIcon from './TypeIcon';

interface CardHeaderProps {
  pokemon: Pokemon;
}

export default function CardHeader({ pokemon }: CardHeaderProps) {
  return (
    <CardHeaderContainer>
      <Name>{pokemon.name}</Name>
      <Health>
        <HealthPrefix>HP</HealthPrefix>
        <HealthPoints>{pokemon.base_experience}</HealthPoints>
        <TypeIcons>
          {pokemon.types.map((type, index) => {
            return (
              <TypeIcon
                key={`typeIcon${index}`}
                typeName={type.type.name}
                index={index}
                stacked
              />
            );
          })}
        </TypeIcons>
      </Health>
    </CardHeaderContainer>
  );
}

const CardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h2`
  text-transform: capitalize;
  font-size: 1.2em;
`;

const Health = styled.div`
  position: relative;

  display: flex;
  align-items: flex-end;
  align-items: center;
`;

const HealthPrefix = styled.span`
  position: relative;
  top: 0.35em;

  font-size: 0.5em;
  font-weight: 800;
`;

const HealthPoints = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  margin-right: 0.25em;
`;

const TypeIcons = styled.div`
  display: flex;
`;
