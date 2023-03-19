interface NameUrlPair {
  name: string;
  url: string;
}

interface VersionGroupDetails {
  level_learned_at: number;
}

interface MoveInfo {
  move: NameUrlPair;
  version_group_details: VersionGroupDetails[];
}

interface SimpleSprite {
  front_default: string;
}

interface Sprites extends SimpleSprite {
  other: OtherSprites;
}

interface OtherSprites {
  dream_world: SimpleSprite;
  'official-artwork': SimpleSprite;
}

interface DamageRelations {
  double_damage_from: NameUrlPair[];
  half_damage_from: NameUrlPair[];
}

export interface TypeOfPokemon {
  name: string;
  type: NameUrlPair;
  damage_relations: DamageRelations;
}

export interface Pokemon {
  base_experience: number;
  height: number;
  id: number;
  moves: MoveInfo[];
  name: string;
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
