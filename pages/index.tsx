import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SuccessAlert from "../components/alerts/SuccessAlert";

export default function Home() {
  type FormData = {
    plate_number: string;
    vehicle_type: string;
    time_in: string;
    time_out: string;
  };

  const [success, setSuccess] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    // Reset State
    setSuccess("");

    // Format date
    const time_in = format(new Date(data.time_in), "yyyy-MM-dd HH:mm:ss");
    const time_out = format(new Date(data.time_out), "yyyy-MM-dd HH:mm:ss");

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plate_number: data.plate_number,
        vehicle_type: data.vehicle_type,
        time_in,
        time_out,
      }),
    };

    const response = await fetch(
      "http://localhost:4000/api/parking",
      requestOptions
    );

    if (response.ok) {
      const { message }: { message: string } = await response.json();
      setSuccess(message);
    } else {
      console.log("Error");
      console.log(response.status);
      console.log(await response.json());
    }
  });

  return (
    <>
      <h1 className="font-bold text-3xl text-center my-8">Input Data Parkir</h1>
      {success && (
        <div className="mb-4">
          <SuccessAlert message={success} />
        </div>
      )}
      <form className="grid grid-cols-2 gap-y-4 gap-x-4" onSubmit={onSubmit}>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="plate_number">Nomor Plat Kendaraan</label>
          <input
            type="text"
            {...register("plate_number", {
              required: true,
            })}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="vehicle_type">Jenis Kendaraan</label>
          <select
            {...register("vehicle_type", {
              required: true,
            })}
          >
            <option value="car">Mobil</option>
            <option value="motorcycle">Motor</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="time_in">Waktu Masuk</label>
          <input
            type="datetime-local"
            step="1"
            {...register("time_in", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="time_out">Waktu Keluar</label>
          <input
            type="datetime-local"
            step="1"
            {...register("time_out", {
              required: true,
            })}
          />
        </div>
        <div className="col-span-2 ">
          <button
            className="block mx-auto py-3 px-2 bg-blue-500 rounded-md text-white font-medium"
            type="submit"
          >
            Simpan Data Parkir
          </button>
        </div>
      </form>
    </>
  );
}
