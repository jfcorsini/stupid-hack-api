'use strict';

const types = {
  0: {
    id: 0,
    name: 'birch',
    phases: {
      one: 10,
      two: 20,
      three: 30,
      four: 40,
    },
  },
  1: {
    id: 1,
    name: 'cactus',
    phases: {
      one: 5,
      two: 15,
      three: 10,
      four: 50,
    },
  },
  2: {
    id: 2,
    name: 'coconut',
    phases: {
      one: 15,
      two: 55,
      three: 77,
      four: 100,
    },
  },
};

const getRandom = () => types[Math.floor(Math.random() * 3)];

module.exports = {
  types,
  getRandom,
};
