const fs = require('fs');
const DayDate = require('../src/DayDate');
const Streak = require('../src/Streak');
const Streaks = require('../src/Streaks.js');


let habits = [];


fs.readFile('./data.txt', 'utf-8', (e, d) => {
  habits = d.split(/\n/);

  // console.log('habits', habits);

  let done = [];
  const dates = {};

  // eslint-disable-next-line no-console
  console.log('\x1B[37;1;4mCurrent Streaks\x1B[0m');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < habits.length; i++) {
    if (!done.includes(habits[i].substring(0, habits[i].indexOf(',')))) {
      done = done.concat([habits[i].substring(0, habits[i].indexOf(','))]);
      const name = habits[i].substring(0, habits[i].indexOf(','));

      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < habits.length; j++) {
        // filter
        if (habits[j].startsWith(name)) {
          if (!dates[name]) {
            dates[name] = [];
          }
          dates[name] = dates[name].concat([new DayDate(habits[j].substring(habits[j].indexOf(',')))]);
        }
      }

      const streaks = [];
      let prev = null;
      let currentStreak = null;

      dates[name].forEach((dayDate) => {
        if (prev && prev.getNext().toString() === dayDate.toString().replace(',', '')) {
          if (currentStreak) {
            currentStreak.setEndDate(dayDate);
          } else {
            currentStreak = new Streak();
            currentStreak.setStartDate(dayDate);
            currentStreak.setEndDate(dayDate);
            streaks.push(currentStreak);
          }
        } else {
          currentStreak = new Streak();
          currentStreak.setStartDate(dayDate);
          currentStreak.setEndDate(dayDate);
          streaks.push(currentStreak);
        }
        prev = dayDate;
      });

      // print current streak
      const streak = new Streaks(streaks);
      streak.printStreaks(null, false, true);
    }
  }
});
