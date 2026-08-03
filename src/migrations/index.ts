import * as migration_20260802_204638_initial from './20260802_204638_initial';

export const migrations = [
  {
    up: migration_20260802_204638_initial.up,
    down: migration_20260802_204638_initial.down,
    name: '20260802_204638_initial'
  },
];
