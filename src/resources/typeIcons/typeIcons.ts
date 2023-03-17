import bug from './bug.svg';
import dark from './dark.svg';
import dragon from './dragon.svg';
import electric from './electric.svg';
import fairy from './fairy.svg';
import fighting from './fighting.svg';
import fire from './fire.svg';
import flying from './flying.svg';
import ghost from './ghost.svg';
import grass from './grass.svg';
import ground from './ground.svg';
import ice from './ice.svg';
import normal from './normal.svg';
import poison from './poison.svg';
import psychic from './psychic.svg';
import rock from './rock.svg';
import steel from './steel.svg';
import water from './water.svg';

const types = new Map();
types.set('bug', { image: bug, color: '#92bc2c' });
types.set('dark', { image: dark, color: '#595761' });
types.set('dragon', { image: dragon, color: '#0c69c8' });
types.set('electric', { image: electric, color: '#f2d94e' });
types.set('fairy', { image: fairy, color: '#ee90e6' });
types.set('fighting', { image: fighting, color: '#d3425f' });
types.set('fire', { image: fire, color: '#fba54c' });
types.set('flying', { image: flying, color: '#a1bbec' });
types.set('ghost', { image: ghost, color: '#5f6dbc' });
types.set('grass', { image: grass, color: '#5fbd58' });
types.set('ground', { image: ground, color: '#da7c4d' });
types.set('ice', { image: ice, color: '#75d0c1' });
types.set('normal', { image: normal, color: '#a0a29f' });
types.set('poison', { image: poison, color: '#b763cf' });
types.set('psychic', { image: psychic, color: '#fa8581' });
types.set('rock', { image: rock, color: '#c9bb8a' });
types.set('steel', { image: steel, color: '#5695a3' });
types.set('water', { image: water, color: '#539ddf' });

export function lookupTypeIcon(name: string) {
  return types.get(name) || normal;
}
