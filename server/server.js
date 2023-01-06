// Load ENV
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Config
const { env, port } = require("./configs/server.config");
const knex = require("./database/knex");

// Import functions
const { parse } = require("date-fns");
const calculateParkingFee = require("./functions/parking/calculateParkingFee");

const app = express();

app.use(cors());
// Parse body params and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/parking", async (req, res) => {
  const { plate_number, vehicle_type, time_in, time_out } = req.body;

  const timeInFormatted = parse(time_in, "yyyy-MM-dd HH:mm:ss", new Date());
  const timeOutFormatted = parse(time_out, "yyyy-MM-dd HH:mm:ss", new Date());

  try {
    const parkingFee = calculateParkingFee(
      vehicle_type,
      timeInFormatted,
      timeOutFormatted
    );

    const saveParkingData = await knex("parking").insert({
      plate_number,
      vehicle_type,
      time_in: timeInFormatted,
      time_out: timeOutFormatted,
      fee: parkingFee,
    });

    return res.json({
      message: `Data Parkir untuk kendaraan dengan plat nomor ${plate_number} berhasil disimpan`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/parking", async (req, res) => {
  /**
   * @type {{vehicle_types: String[] | String, time_in: String, time_out: String, min_fee: number, max_fee:number}}
   */
  let { vehicle_types, time_in_start, time_in_end, min_fee, max_fee } =
    req.query;

  // Initialise knex query
  const query = knex("parking").select();

  // Add where query for every vehicle type
  if (!!vehicle_types) {
    // Convert string to array of query
    if (typeof vehicle_types === "string") {
      vehicle_types = []
        .concat(vehicle_types)
        .map((vehicle_type) => vehicle_type);
    }

    query.whereIn("vehicle_type", vehicle_types);
  }

  if (!!time_in_start) {
    // Parse time
    const timeInStartFormatted = parse(
      time_in_start,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );

    // Add where clause to check time_in
    query.where("time_in", ">=", timeInStartFormatted);
  }

  if (!!time_in_end) {
    // Parse time
    const timeInEndFormatted = parse(
      time_in_end,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );

    // Add where clause to check time_in
    query.where("time_in", "<=", timeInEndFormatted);
  }

  // Add where query for min_fee and max_fee
  if (!!min_fee) {
    query.where("fee", ">=", min_fee);
  }

  if (!!max_fee) {
    query.where("fee", "<=", max_fee);
  }

  const parkingData = await query;

  return res.json({
    message: "Parking data list.",
    data: parkingData,
  });
});

// listen to requests
app.listen(port, (err) => {
  if (err) {
    console.log("server failed to start", err);
  }

  // Check Database Connection
  knex
    .raw("select 1+1 as result")
    .then(function () {
      console.log("Database connection succeeded.");
    })
    .catch(function (error) {
      console.log("Database connection failed.");
      console.log(error);
    });

  console.log(`server started [env, port] = [${env}, ${port}]`);
});
