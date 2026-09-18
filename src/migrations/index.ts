import * as migration_20260802_204638_initial from './20260802_204638_initial';
import * as migration_20260917_161045_hero_rotating_words from './20260917_161045_hero_rotating_words';

export const migrations = [
  {
    up: migration_20260802_204638_initial.up,
    down: migration_20260802_204638_initial.down,
    name: '20260802_204638_initial',
  },
  {
    up: migration_20260917_161045_hero_rotating_words.up,
    down: migration_20260917_161045_hero_rotating_words.down,
    name: '20260917_161045_hero_rotating_words'
  },
];
