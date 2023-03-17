interface NameUrlPair {
  name: string;
  url: string;
}

interface Ability {
  ability: NameUrlPair;
  is_hidden: boolean;
  slot: number;
}

interface Item {
  item: NameUrlPair;
}

interface MoveInfo {
  move: NameUrlPair;
}

interface SimpleSprite {
  front_default: string;
}

interface Sprites extends SimpleSprite {
  other: OtherSprites;
}

interface OtherSprites {
  dream_world: SimpleSprite;
  "official-artwork": SimpleSprite;
}

interface TypeOfPokemon {
  type: NameUrlPair;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: NameUrlPair[];
  height: number;
  held_items: Item[];
  id: number;
  moves: MoveInfo[];
  name: string;
  species: NameUrlPair;
  sprites: Sprites;
  types: TypeOfPokemon[];
  weight: number;
}

interface FlavorTextEntries {
  flavor_text: string;
}

interface TypeOfMove {
  name: string;
}

export interface Move {
  name: string;
  flavor_text_entries: FlavorTextEntries[];
  type: TypeOfMove;
  pp: number;
}
