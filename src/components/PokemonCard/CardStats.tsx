import styled from 'styled-components';
import { TypeOfPokemon } from '../../types';
import TypeIcon from './TypeIcon';

interface CardStatsProps {
  type: TypeOfPokemon;
}

export default function CardStats({ type }: CardStatsProps) {
  const weakness = type.damage_relations.double_damage_from[0]?.name;
  const resistance = type.damage_relations.half_damage_from[0]?.name;

  return (
    <CardStatsContainer>
      <Stat>
        <span>weakness</span>
        {weakness && (
          <>
            <TypeIcon typeName={weakness} />
            <span>x2</span>
          </>
        )}
      </Stat>
      <span>|</span>
      <Stat>
        <span>resistance</span>
        {resistance && (
          <>
            <TypeIcon typeName={resistance} />
            <span>-20</span>
          </>
        )}
      </Stat>
    </CardStatsContainer>
  );
}

const CardStatsContainer = styled.div`
  width: 110%;
  margin-top: 2em;
  padding: 0 0.5em;

  display: flex;
  gap: 0.5em;
  align-self: center;

  font-weight: bold;
  font-size: 0.9em;
  background: #f8f8f8;
  border-radius: 1em;
  box-shadow: 0px 2px 4px 0 #00000060;
`;

const Stat = styled.div`
  display: flex;
  gap: 0.1em;
`;
