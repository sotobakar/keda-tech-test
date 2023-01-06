import { format } from "date-fns";
import id from "date-fns/locale/id";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as qs from "qs";

export default function Parking() {
  const [parkingData, setParkingData] = useState<any[]>([]);

  type FormData = {
    vehicle_types: string[];
    time_in_start: any;
    time_in_end: any;
    min_fee: string;
    max_fee: string;
  };

  const { register, handleSubmit } = useForm<FormData>();

  const getParkingData = async (queryString = "") => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `http://localhost:4000/api/parking?${queryString}`,
      requestOptions
    );
    if (response.ok) {
      const { data } = await response.json();
      setParkingData(data);
    }
  };

  useEffect(() => {
    getParkingData();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => !!value)
    );
    // Parse time_in_start
    if (Object.hasOwn(filteredData, "time_in_start")) {
      filteredData.time_in_start = format(
        new Date(filteredData.time_in_start),
        "yyyy-MM-dd HH:mm:ss"
      );
    }

    // Parse time_in_end
    if (Object.hasOwn(filteredData, "time_in_end")) {
      filteredData.time_in_end = format(
        new Date(filteredData.time_in_end),
        "yyyy-MM-dd HH:mm:ss"
      );
    }

    let queryString = qs.stringify(filteredData);

    getParkingData(queryString);
    console.log(filteredData);
  });

  return (
    <>
      <h1 className="font-bold text-3xl text-center my-8">List Data Parkir</h1>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="grid grid-cols-5">
            <div className="col-span-1 px-4">
              <h2 className="text-2xl font-bold mb-4">Filter</h2>
              <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <label htmlFor="">Jenis Kendaraan</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value={`car`}
                      {...register("vehicle_types")}
                    />
                    <label className="ml-2 font-medium">Mobil</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value={`motorcycle`}
                      {...register("vehicle_types")}
                    />
                    <label className="ml-2 font-medium">Motor</label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>Waktu Masuk</label>
                  <input
                    className="mt-2 rounded-md"
                    type="datetime-local"
                    step="1"
                    {...register("time_in_start")}
                  />
                  <span className="my-2 text-center text-sm font-medium">
                    hingga
                  </span>
                  <input
                    className="rounded-md"
                    type="datetime-local"
                    step="1"
                    {...register("time_in_end")}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Tarif (rp)</label>
                  <input
                    className="mt-2 rounded-md"
                    type="text"
                    {...register("min_fee")}
                    placeholder="0"
                  />
                  <span className="my-2 text-center text-sm font-medium">
                    hingga
                  </span>
                  <input
                    className="rounded-md"
                    type="text"
                    {...register("max_fee")}
                  />
                </div>
                <button className="py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
                  Filter Data
                </button>
              </form>
            </div>
            <div className="col-span-4 -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Plat Nomor
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Jenis Kendaraan
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Waktu Masuk
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Waktu Keluar
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tarif
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {parkingData.map((data) => (
                        <tr key={data.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {data.plate_number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                            {data.vehicle_type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {format(
                              new Date(data.time_in),
                              "d MMMM yyyy HH:mm:ss",
                              {
                                locale: id,
                              }
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {format(
                              new Date(data.time_out),
                              "d MMMM yyyy HH:mm:ss",
                              {
                                locale: id,
                              }
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {`Rp. ${data.fee.toLocaleString("id-ID")}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
