import styled from 'styled-components';
import { Move } from '../../types';

import TypeIcon from './TypeIcon';

interface CardMoveListProps {
  moves: Move[];
}

export default function CardMoveList({ moves }: CardMoveListProps) {
  return (
    <MoveListContainer>
      {moves.map((move) => {
        return (
          <div key={`${move.name} move`}>
            <Header>
              <Name>
                <TypeIcon typeName={move.type.name} />
                <span>{move.name}</span>
              </Name>
              <span>{move.pp}</span>
            </Header>
            <Description>{move.flavor_text_entries[0].flavor_text}</Description>
          </div>
        );
      })}
    </MoveListContainer>
  );
}

const MoveListContainer = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  display: flex;

  text-transform: capitalize;
  font-weight: bold;

  > span {
    margin-left: 2em;
  }
`;

const Description = styled.div`
  font-size: 0.6em;
`;
