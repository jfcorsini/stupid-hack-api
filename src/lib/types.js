'use strict';

const types = {
  0: {
    id: 0,
    name: 'birch',
    phases: {
      zero: 0,
      one: 35,
      two: 60,
      three: 1780,
      four: 16425,
    },
  },
  1: {
    id: 1,
    name: 'cactus',
    phases: {
      zero: 0,
      one: 21,
      two: 180,
      three: 3560,
      four: 24920,
    },
  },
  2: {
    id: 2,
    name: 'coconut',
    phases: {
      zero: 0,
      one: 150,
      two: 534,
      three: 1068,
      four: 2136,
    },
  },
};

const getRandom = () => types[Math.floor(Math.random() * 3)];

const getNameByKind = id => types[id].name;

const getByKind = id => types[id];

const getPhaseByAge = (typeId, age) => {
  const type = types[typeId];
  switch (true) {
    case age < type.phases.one:
      return 'zero';
    case age < type.phases.two:
      return 'one';
    case age < type.phases.three:
      return 'two';
    case age < type.phases.four:
      return 'three';
    case age < type.phases.five:
      return 'four';
    default:
      return 'five';
  }
};

module.exports = {
  getNameByKind,
  getByKind,
  getRandom,
  getPhaseByAge,
};
