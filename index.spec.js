const Offer = require("./index");

function changeData(offer, minutes, hours, day, week, month, year) {
  offer.minutes = minutes;
  offer.hours = hours;
  offer.day = day;
  offer.week = week;
  offer.month = month;
  offer.year = year;
}

describe("offer price", () => {
  test("min offer for eng without +percentage", () => {
    const offer = new Offer(1000, "str.doc", "eng");
    offer.calculate();
    expect(offer.price).toBe(120);
  });
  test("min offer for ukr without +percentage", () => {
    const offer = new Offer(1000, "str.doc", "Українська");
    offer.calculate();
    expect(offer.price).toBe(50);
  });
  test("min offer for eng with +percentage", () => {
    const offer = new Offer(1000, "str.doeec", "eng");
    offer.calculate();
    expect(offer.price).toBe(144);
  });
  test("min offer for eng with +percentage", () => {
    const offer = new Offer(1000, "str.doeec", "Українська");
    offer.calculate();
    expect(offer.price).toBe(60);
  });

  test("big offer for eng without +percentage", () => {
    const offer = new Offer(89000, "str.doc", "eng");
    offer.calculate();
    expect(offer.price).toBe(10680);
  });
  test("big offer for ukr without +percentage", () => {
    const offer = new Offer(89000, "str.doc", "Українська");
    offer.calculate();
    expect(offer.price).toBe(4450);
  });
  test("big offer for eng with +percentage", () => {
    const offer = new Offer(89000, "str.doeec", "eng");
    offer.calculate();
    expect(offer.price).toBe(12816);
  });
  test("big offer for ukr with +percentage", () => {
    const offer = new Offer(89000, "str.doeec", "Українська");
    offer.calculate();
    expect(offer.price).toBe(5340);
  });
});

describe("offer week time", () => {
  test("big offer for ukr without +percentage", () => {
    const offer = new Offer(60000, "str.doc", "Українська");
    changeData(offer, 5, 10, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["01", "09", "2020", "11", "00"]);
  });

  test("big offer for eng without +percentage ", () => {
    const offer = new Offer(60000, "str.doc", "eng");
    changeData(offer, 20, 10, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["22", "09", "2020", "11", "30"]);
  });

  test("big offer for ukr with +percentage", () => {
    const offer = new Offer(60000, "str.txt", "Українська");
    changeData(offer, 45, 10, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["02", "09", "2020", "11", "30"]);
  });

  test("big offer for eng with +percentage", () => {
    const offer = new Offer(60000, "str.txt", "eng");
    changeData(offer, 58, 10, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["28", "09", "2020", "12", "00"]);
  });

  test("min offer for ukr without +percentage", () => {
    const offer = new Offer(3500, "str.doc", "Українська");
    changeData(offer, 2, 11, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["25", "08", "2020", "14", "30"]);
  });

  test("min offer for eng without +percentage ", () => {
    const offer = new Offer(840, "str.doc", "eng");
    changeData(offer, 59, 10, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["25", "08", "2020", "14", "30"]);
  });

  test("min offer for ukr with +percentage", () => {
    const offer = new Offer(3400, "str.txt", "Українська");
    changeData(offer, 8, 11, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["25", "08", "2020", "15", "00"]);
  });

  test("min offer for eng with +percentage", () => {
    const offer = new Offer(700, "str.txt", "eng");
    changeData(offer, 6, 11, 25, 2, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["25", "08", "2020", "14", "30"]);
  });
});

describe("offer weekend time", () => {
  test("min offer for ukr without +percentage", () => {
    const offer = new Offer(200, "str.doc", "Українська");
    changeData(offer, 35, 6, 23, 0, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["24", "08", "2020", "11", "30"]);
  });
  test("min offer for eng without +percentage", () => {
    const offer = new Offer(200, "str.doc", "eng");
    changeData(offer, 35, 6, 23, 0, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["24", "08", "2020", "11", "30"]);
  });
  test("min offer for ukr without +percentage", () => {
    const offer = new Offer(200, "str.txt", "Українська");
    changeData(offer, 35, 6, 22, 6, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["24", "08", "2020", "11", "30"]);
  });
  test("min offer for eng without +percentage", () => {
    const offer = new Offer(200, "str.txt", "eng");
    changeData(offer, 35, 6, 22, 6, 7, 2020);
    offer.calculate();
    expect(offer.finishDate).toEqual(["24", "08", "2020", "11", "30"]);
  });
});
