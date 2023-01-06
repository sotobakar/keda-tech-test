const {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} = require("date-fns");

const calculateParkingFee = (vehicle_type, timeIn, timeOut) => {
  let parkingFee = 0;
  let pricePerHour;
  let pricePerDay;

  if (vehicle_type == "car") {
    pricePerHour = 5000;
    pricePerDay = 80000;

    let daysParked = differenceInDays(timeOut, timeIn);
    parkingFee += daysParked * pricePerDay;

    let hoursParked = differenceInHours(timeOut, timeIn);
    hoursParked = hoursParked % 24;
    parkingFee += hoursParked * pricePerHour;

    let minutesParked = differenceInMinutes(timeOut, timeIn);
    minutesParked = minutesParked % 60;

    if (minutesParked >= 1) {
      parkingFee += pricePerHour;
    }

    return parkingFee;
  } else if (vehicle_type == "motorcycle") {
    pricePerHour = 2000;
    pricePerDay = 40000;

    let daysParked = differenceInDays(timeOut, timeIn);
    parkingFee += daysParked * pricePerDay;

    let hoursParked = differenceInHours(timeOut, timeIn);
    hoursParked = hoursParked % 24;
    parkingFee += hoursParked * pricePerHour;

    let minutesParked = differenceInMinutes(timeOut, timeIn);
    minutesParked = minutesParked % 60;

    if (minutesParked >= 1) {
      parkingFee += pricePerHour;
    }

    return parkingFee;
  } else {
    const error = new Error(
      `Jenis kendaraan yang diperbolehkan adalah "car" dan "motorcycle"`
    );
    error.code = 422;

    throw error;
  }
};

module.exports = calculateParkingFee;
