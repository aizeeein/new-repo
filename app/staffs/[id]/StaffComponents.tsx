"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface StaffComponentProps {
  staff: {
    id: number;
    nik: string;
    nama: string;
    cabang: string;
    kpi_1: number;
    kpi_2: number;
    kpi_3: number;
  };
}

const StaffComponent: React.FC<StaffComponentProps> = ({ staff }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [kpi_1, setKpi_1] = useState(staff.kpi_1);
  const [kpi_2, setKpi_2] = useState(staff.kpi_2);
  const [kpi_3, setKpi_3] = useState(staff.kpi_3);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(`/api/staff/${staff.id}`, [kpi_1, kpi_2, kpi_3])
      .then(() => {
        toast.success("KPI Updated");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              NIK
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              NAMA
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              CABANG
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              KPI_1
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              KPI_2
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              KPI_3
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr key={staff?.id}>
            <td className="p-3 text-sm text-gray-700">{staff?.nik}</td>
            <td className="p-3 text-sm text-gray-700">{staff?.nama}</td>
            <td className="p-3 text-sm text-gray-700">{staff?.cabang}</td>
            <td className="p-3 text-sm text-gray-700">
              <input
                className="w-10"
                type="number"
                value={kpi_1}
                onChange={(e) => setKpi_1(parseInt(e.target.value))}
              />
            </td>
            <td className="p-3 text-sm text-gray-700">
              <input
                className="w-10"
                type="number"
                value={kpi_2}
                onChange={(e) => setKpi_2(parseInt(e.target.value))}
              />
            </td>
            <td className="p-3 text-sm text-gray-700">
              <input
                className="w-10"
                type="number"
                value={kpi_3}
                onChange={(e) => setKpi_3(parseInt(e.target.value))}
              />
            </td>
            <td className="p-3 text-sm text-gray-700">
              <div className="flex gap-3">
                <div>
                  <button
                    onClick={handleSubmit}
                    className="
                        bg-slate-500
                        text-neutral-200
                        p-2
                        rounded-lg
                        hover:opacity-80
                        transition
                        w-full
                      "
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button
                  onClick={() => router.push('/')}
                    className="
                        bg-slate-500
                        text-neutral-200
                        p-2
                        rounded-lg
                        hover:opacity-80
                        transition
                        w-full
                      "
                  >Go to Menu</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StaffComponent;
