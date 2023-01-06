const calculateParkingFee = require("../functions/parking/calculateParkingFee");
const { addHours, addMinutes } = require("date-fns");

test("throw error jika jenis kendaraan tidak benar", () => {
  expect(() => {
    calculateParkingFee("becak", new Date(), new Date());
  }).toThrow(Error);
});

test("tarif parkir motor dihitung dengan benar", () => {
  let fee = calculateParkingFee(
    "motorcycle",
    new Date(),
    addHours(new Date(), 14)
  );
  expect(fee).toBe(28000);

  // Lebih dari 1 hari
  fee = calculateParkingFee("motorcycle", new Date(), addHours(new Date(), 26));
  expect(fee).toBe(44000);

  fee = calculateParkingFee("motorcycle", new Date(), addHours(new Date(), 74));
  expect(fee).toBe(124000);
});

test("tarif parkir mobil dihitung dengan benar", () => {
  let fee = calculateParkingFee("car", new Date(), addHours(new Date(), 14));
  expect(fee).toBe(70000);

  // Lebih dari 1 hari
  fee = calculateParkingFee("car", new Date(), addHours(new Date(), 26));
  expect(fee).toBe(90000);

  fee = calculateParkingFee("car", new Date(), addHours(new Date(), 74));
  expect(fee).toBe(250000);
});

test("lebih dari 1 menit maka tarif parkir dihitung 1 jam", () => {
  let fee = calculateParkingFee("car", new Date(), addMinutes(new Date(), 61));
  expect(fee).toBe(10000);
});
