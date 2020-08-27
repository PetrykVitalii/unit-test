const Offer = require("./index");

describe('big offer price', () => {
  test.each`
    language     | percentage      | result
    ${'ru'}      | ${'str.doc'}    | ${50}
    ${'uk'}      | ${'str.doc'}    | ${50}
    ${'eng'}     | ${'str.doc'}    | ${120}
    ${'ru'}      | ${'str.txt'}    | ${60}
    ${'uk'}      | ${'str.txt'}    | ${60}
    ${'eng'}     | ${'str.txt'}    | ${144}
  `('change language, percentage', ({ language,percentage, result }) => {
    const offer = new Offer(1000, percentage, language,new Date(2020,7,25,10,5));
    offer.calculate();
    expect(offer.price).toBe(result);
  });
});

describe('min offer price', () => {
  test.each`
    language     | percentage      | result
    ${'ru'}      | ${'str.doc'}    | ${4450}
    ${'uk'}      | ${'str.doc'}    | ${4450}
    ${'eng'}     | ${'str.doc'}    | ${10680}
    ${'ru'}      | ${'str.txt'}    | ${5340}
    ${'uk'}      | ${'str.txt'}    | ${5340}
    ${'eng'}     | ${'str.txt'}    | ${12816}
  `('change language, percentage', ({ language,percentage, result }) => {
    const offer = new Offer(89000, percentage, language,new Date(2020,7,25,10,5));
    offer.calculate();
    expect(offer.price).toBe(result);
  });
});

describe('big offer week time', () => {
  test.each`
    language     | percentage      | result
    ${'ru'}      | ${'str.doc'}    | ${"01/09/2020 11:00"}
    ${'uk'}      | ${'str.doc'}    | ${"01/09/2020 11:00"}
    ${'eng'}     | ${'str.doc'}    | ${"22/09/2020 11:00"}
    ${'ru'}      | ${'str.txt'}    | ${"02/09/2020 11:00"}
    ${'uk'}      | ${'str.txt'}    | ${"02/09/2020 11:00"}
    ${'eng'}     | ${'str.txt'}    | ${"28/09/2020 11:00"}
  `('change language, percentage', ({ language,percentage, result }) => {
    const offer = new Offer(60000, percentage, language,new Date(2020,7,25,10,5));
    offer.calculate();
    expect(offer.finishDate).toEqual(result);
  });
});

describe('min offer week time', () => {
  test.each`
    language     | percentage | result
    ${'ru'}      | ${'str.doc'}    | ${"25/08/2020 13:30"}
    ${'uk'}      | ${'str.doc'}    | ${"25/08/2020 13:30"}
    ${'eng'}     | ${'str.doc'}    | ${"26/08/2020 12:30"}
    ${'ru'}      | ${'str.txt'}    | ${"25/08/2020 14:00"}
    ${'uk'}      | ${'str.txt'}    | ${"25/08/2020 14:00"}
    ${'eng'}     | ${'str.txt'}    | ${"26/08/2020 14:30"}
  `('change language, percentage', ({ language,percentage, result }) => {
    const offer = new Offer(3500, percentage, language,new Date(2020,7,25,10,5));
    offer.calculate();
    expect(offer.finishDate).toEqual(result);
  });
});

describe('offer weekend time', () => {
  test.each`
    language     | percentage  | day   | result
    ${'ru'}      | ${'str.doc'}| ${22} | ${"24/08/2020 11:30"}
    ${'uk'}      | ${'str.doc'}| ${22} | ${"24/08/2020 11:30"}
    ${'eng'}     | ${'str.doc'}| ${22} | ${"24/08/2020 11:30"}
    ${'ru'}      | ${'str.txt'}| ${22} | ${"24/08/2020 11:30"}
    ${'uk'}      | ${'str.txt'}| ${22} | ${"24/08/2020 11:30"}
    ${'eng'}     | ${'str.txt'}| ${22} | ${"24/08/2020 11:30"}
    ${'ru'}      | ${'str.doc'}| ${23} | ${"24/08/2020 11:30"}
    ${'uk'}      | ${'str.doc'}| ${23} | ${"24/08/2020 11:30"}
    ${'eng'}     | ${'str.doc'}| ${23} | ${"24/08/2020 11:30"}
    ${'ru'}      | ${'str.txt'}| ${23} | ${"24/08/2020 11:30"}
    ${'uk'}      | ${'str.txt'}| ${23} | ${"24/08/2020 11:30"}
    ${'eng'}     | ${'str.txt'}| ${23} | ${"24/08/2020 11:30"}
  `('change language, percentage, day', ({ language,percentage, result }) => {
    const offer = new Offer(200, percentage, language,new Date(2020,7,22,6,35));
    offer.calculate();
    expect(offer.finishDate).toEqual(result);
  });
});