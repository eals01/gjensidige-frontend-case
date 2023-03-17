import styled from "styled-components"
import { Pokemon } from "../types"

import TypeIcon from "./TypeIcon"

interface CardHeaderProps {
    pokemon: Pokemon
}

export default function CardHeader({ pokemon }: CardHeaderProps) {
    return (
        <CardHeaderContainer>
            <Name>{pokemon.name}</Name>
            <Health>
                <span className='healthPrefix'>HP</span>
                <span className='healthPoints'>{pokemon.base_experience}</span>
                <TypeIcons>
                    {pokemon.types.map((type, index) => {
                        return (
                            <TypeIcon
                                key={`typeIcon${index}`}
                                typeName={type.type.name}
                                index={index}
                            />
                        )
                    })}
                </TypeIcons>
            </Health>
        </CardHeaderContainer>
    )
}

const CardHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Name = styled.h2`
  text-transform: capitalize;
    font-size: 1.2em;
`

const Health = styled.div`
  position: relative;

  display: flex;
  align-items: flex-end;
  align-items: center;

  .healthPrefix {
    position: relative;
    top: 0.35em;

    font-size: 0.5em;
    font-weight: 800;
  }

  .healthPoints {
    font-size: 1.2em;
    font-weight: 600;
  }
`

const TypeIcons = styled.div`
  display: flex;
`