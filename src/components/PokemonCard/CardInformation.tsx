import styled from 'styled-components';
import { Pokemon } from '../../types';

interface CardInformationProps {
  pokemon: Pokemon;
}

export default function CardInformation({ pokemon }: CardInformationProps) {
  return (
    <CardInformationContainer>
      <span>{`NO: ${pokemon.id}. HT: ${pokemon.height} dm. WT: ${pokemon.weight} hg.`}</span>
    </CardInformationContainer>
  );
}

const CardInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;

  width: 90%;
  margin-bottom: 1em;

  background: linear-gradient(
    90deg,
    #7e7e7e 0%,
    #e3e3e3 25%,
    #787878 50%,
    #e3e3e3 75%,
    #7e7e7e 100%
  );
  font-size: 0.8em;
  font-weight: bold;
  transform: perspective(10px) rotateX(1deg);
`;
