module.exports = class DayDate {
  constructor(string) {
    this.date = string;
  }

  subtractDays(numberOfDays) {
    let d = new Date(this.date);
    d.setDate(d.getDate() - numberOfDays);
    let mon = `${d.getMonth() + 1}`;
    if (d.getMonth() < 10) mon = `0${mon}`;
    let day = d.getDate();
    if (d.getDate() < 10) day = `0${day}`;
    return new DayDate(`${d.getFullYear()}-${mon}-${day}`);
  }

  static today() {
    const d = new Date();
    let mon = `${d.getMonth() + 1}`;
    if (d.getMonth() < 10) mon = `0${mon}`;
    let day = d.getDate();
    if (d.getDate() < 10) day = `0${day}`;
    return new DayDate(`${d.getFullYear()}-${mon}-${day}`);
  }

  getNext() {
    var d = new Date(this.date);
    d.setDate(d.getDate() + 1);
    var mon = `${d.getMonth() + 1}`;
    if (d.getMonth() < 10) mon = '0' + mon;
    var day = d.getDate();
    if (d.getDate() < 10) day = '0' + day;
    return new DayDate(`${d.getFullYear()}-${mon}-${day}`);
  }

  toString() {
    return this.date;
  }
}
