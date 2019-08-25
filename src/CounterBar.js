module.exports = class CounterBar {
  constructor(streak) {
    this.streak = streak;
  }

  getBar() {
    let bar = '\x1B[42m'; // green color
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= this.streak.noDays(); i++) {
      bar += ' '; // add spaces
    }
    bar += '\x1B[0m '; // reset
    return bar;
  }
};
