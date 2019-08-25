const fs = require('fs');
const DayDate = require('../src/DayDate');
const Streaks = require('../src/Streaks');
const Streak = require('../src/Streak');

let habits = [];
let max; // Length of the longest habit name

fs.readFile('./data.txt', 'utf-8', (e, d) => {
  habits = d.split(/\n/);

  let done = [];
  const dates = {};
  let times = 1;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < habits.length; i++) {
    if (!done.includes(habits[i].substring(0, habits[i].indexOf(',')))) {
      done = done.concat([habits[i].substring(0, habits[i].indexOf(','))]);
      const name = habits[i].substring(0, habits[i].indexOf(','));

      if (max) {
        if (name.length > max) {
          max = name.length;
        }
      }

      if (!max) {
        // the max is set for the first time
        max = name.length;
      }

      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < habits.length; j++) {
        if (habits[j].startsWith(name)) {
          if (times) {
            // eslint-disable-next-line no-plusplus
            times++; // increment times
          } else {
            times = 1;
          }

          if (!dates[name]) {
            dates[name] = [];
          }
          dates[name] = dates[name].concat([new DayDate(habits[j].substring(habits[j].indexOf(',')))]);
        }
      }

      let streaks = [];
      let prev = null;
      let currentStreak = null;

      // create streaks
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
        // set previous date
        prev = dayDate;
      });

      // filter out small streaks

      // print best streak
      streaks = new Streaks(streaks);
      streaks.printStreaks(max, true, false);

      times = 1;
    }
  }
});

// eslint-disable-next-line no-console
console.log('\x1B[37;1;4mBest Streaks\x1B[0m');
