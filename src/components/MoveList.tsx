import styled from "styled-components"
import { Move } from "../types"

import TypeIcon from "./TypeIcon"

interface MoveListProps {
    moves: Move[]
}

export default function MoveList({ moves }: MoveListProps) {
    return <MoveListContainer>
        {moves.map(move => {
            return (
                <PokemonMove key={move.name}>
                    <MoveHeader>
                        <div className='moveName'>
                            <TypeIcon typeName={move.type.name} />
                            <span>{move.name}</span>
                        </div>
                        <span>{move.pp}</span>
                    </MoveHeader>
                    <span className='moveDescription'>
                        {move.flavor_text_entries[0].flavor_text}
                    </span>
                </PokemonMove>
            )
        })}
    </MoveListContainer>
}

const MoveListContainer = styled.div``

const PokemonMove = styled.div`
  > .moveDescription {
      font-size: 0.6em;
    }
`

const MoveHeader = styled.div`
  display: flex;
  justify-content: space-between;

  > .moveName {
    display: flex;

    text-transform: capitalize;
    font-weight: bold;

    > span {
      margin-left: 2em;
    }
  }
`