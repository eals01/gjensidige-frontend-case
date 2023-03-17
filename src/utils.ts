import { Move, Pokemon } from "./types";

export const fetchPokemon = async (pokemonName: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then<Pokemon>(
    response => {
      const expectedResponseCode = 200;
      if (response.status === expectedResponseCode) {
        return response.json();
      }
      throw new Error(
        `Got HTTP status code ${response.status}, when HTTP status code ${expectedResponseCode} was expected`
      );
    }
  );

export const fetchMove = async (abilityUrl: string) =>
  fetch(abilityUrl).then<Move>(response => {
    const expectedResponseCode = 200;
    if (response.status === expectedResponseCode) {
      return response.json();
    }
    throw new Error(
      `Got HTTP status code ${response.status}, when HTTP status code ${expectedResponseCode} was expected`
    );
  });
