import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { Pokemon } from "../types";

import arrow from '../resources/arrow.svg';
import pikachuIcon from '../resources/pikachuIcon.svg';

interface PokemonListProps {
    collectedPokemon: Pokemon[];
    displayCollectedPokemon: (pokemon: Pokemon) => void;
}

export default function PokemonList({ collectedPokemon, displayCollectedPokemon }: PokemonListProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <PokemonListContainer>
            <ExpandButton onClick={() => setExpanded(oldExpanded => !oldExpanded)}>
                <motion.img
                    src={arrow}
                    alt='arrow'
                    animate={{ rotateZ: expanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                />
            </ExpandButton>
            {collectedPokemon.length === 0 && (
                <Placeholder>
                    <span>Samlede Pokémon vises her</span>
                    <img src={pikachuIcon} />
                </Placeholder>
            )}
            <ListContainer
                as={motion.div}
                initial={{ width: 250 }}
                animate={{ width: expanded ? 500 : 250 }}
            >
                <List>
                    {collectedPokemon.map((pokemon) => {
                        return (
                            <ListItem
                                key={`${pokemon.name} list item`}
                                as={motion.div}
                                initial={{ y: document.body.offsetHeight }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                onClick={() => displayCollectedPokemon(pokemon)}
                            >
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <span>{pokemon.name}</span>
                            </ListItem>
                        );
                    })}
                </List>
            </ListContainer>
        </PokemonListContainer>
    );
}

const PokemonListContainer = styled.div`
    position: relative;
    right: -250px;
    margin-left: -250px;
    height: 100%;
    flex: 0 0 500;
    
    background: #e7e7e780;
`;

const Placeholder = styled.div`
    height: 100%;
    max-width: 250px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
        height: 2em;
    }

    > span {
        font-weight: bold;
    }
`;

const ExpandButton = styled.div`
    position: absolute;
    top: 0;
    left: -50px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    background: #e7e7e7;

    &:hover {
        background: #c6c6c6
    }

    > img {
        height: 60%;
    }
`;

const ListContainer = styled.div`
`;

const List = styled.div`
    width: 250px;

    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    gap: 1em;
`;

const ListItem = styled.div`
    position: relative;

    width: 100px;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #c6c6c6;

    &:hover {
        background: #a5a5a5;
    }

    > span {
        position: absolute;
        bottom: 0;
        text-transform: capitalize;
        font-weight: bold;
    }
`;