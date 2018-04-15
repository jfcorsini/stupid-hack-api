'use strict';

const getTimeOfDay = (time = new Date()) => {
  if (time.getHours() >= 6 && time.getHours() < 18) {
    return 'day';
  }

  return 'night';
};

module.exports = {
  getTimeOfDay,
};
