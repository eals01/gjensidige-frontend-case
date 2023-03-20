import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { Pokemon } from "../types";

import arrow from '../resources/arrow.svg';
import search from '../resources/search.svg';
import pikachuIcon from '../resources/pikachuIcon.svg';

interface PokemonListProps {
    collectedPokemon: Pokemon[];
    displayCollectedPokemon: (pokemon: Pokemon) => void;
}

export default function PokemonList({ collectedPokemon, displayCollectedPokemon }: PokemonListProps) {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [expanded, setExpanded] = useState(false);

    const filteredCollectedPokemon = collectedPokemon.filter((pokemon) => pokemon.name.includes(searchPrompt));

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
                    <span>Samlede pokemon vises her</span>
                    <img src={pikachuIcon} alt='pikachu icon' />
                </Placeholder>
            )}
            {collectedPokemon.length > 0 && filteredCollectedPokemon.length === 0 && (
                <Placeholder>
                    <span>Ingen pokemon ble funnet</span>
                    <img src={pikachuIcon} alt='pikachu icon' />
                </Placeholder>
            )}
            <ListContainer
                as={motion.div}
                initial={{ width: 250 }}
                animate={{ width: expanded ? 500 : 250 }}
            >
                <Search>
                    <input
                        type='text'
                        value={searchPrompt}
                        onChange={(event) => setSearchPrompt(event.target.value)}
                    />
                    <img src={search} alt='magnifying glass' />
                </Search>
                <List>
                    {filteredCollectedPokemon.map((pokemon) => {
                        return (
                            <ListItem
                                key={`${pokemon.name} list item`}
                                as={motion.div}
                                layout
                                initial={{ y: document.body.offsetHeight }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                onClick={() => displayCollectedPokemon(pokemon)}
                            >
                                <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
                                <span>{pokemon.name}</span>
                            </ListItem>
                        );
                    })}
                </List>
            </ListContainer>
            <BottomGradient className='bruh' />
        </PokemonListContainer>
    );
}

const PokemonListContainer = styled.div`
    position: relative;
    right: -250px;
    margin-left: -250px;
    height: 100%;
    flex: 0 0 500;
    
    background: #e7e7e7;
`;

const Search = styled.div`
    width: 250px;
    padding: 1em;
    padding-bottom: 0;

    display: flex;
    justify-content: center;

    > input {
        height: 3em;
        width: 100%;

        padding-left: 1em;
        border: 1px solid gray;
        border-right: none;

        &:focus {
            outline: none;
        }
    }

    > img {
        height: 2.5em;
        border: 1px solid gray;
        border-left: none;
        background: white;
    }
`;

const Placeholder = styled.div`
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    max-width: 250px;
    padding: 0 1em;
    text-align: center;
    
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
    position: relative;

    overflow-y: scroll;
    height: 100%;
    max-height: calc(100vh - 60px);
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
    text-align: center;

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

const BottomGradient = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    
    width: 100%;
    height: 50px;
    background: linear-gradient(180deg, #e7e7e700 0%, #e7e7e7ff 75%);
    
    pointer-events: none;
`;