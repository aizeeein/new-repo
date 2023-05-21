"use client";

import { data_staff } from "@prisma/client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useRentModal from "../hooks/useRentModal";
import useLoginModal from "../hooks/useLoginModal";
import ClientOnly from "./ClientOnly";
import EmptyState from "./EmptyState";

interface StaffClientProps {
  currentUser?: any;
  listings?: data_staff[] | null;
}

interface IFormInput {
  kpi_1: number;
  kpi_2: number;
  kpi_3: number;
}

const StaffClient: React.FC<StaffClientProps> = ({ currentUser, listings }) => {
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
  }, [currentUser, loginModal, rentModal]);

  const handleSubmit = () => {};

  return (
    <div
      className="
          w-full          
          "
    >
      <div className="flex justify-center pb-9 border-b-[1px] shadow-md">
        <div className="cursor-pointer bg-neutral-300 hover:bg-neutral-500 p-3 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl outline items-center">
          KPI STAFF
        </div>
      </div>

      <div className="flex flex-auto">
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
            {listings?.map((listing) => (
              <tr key={listing?.id}>
                <td className="p-3 text-sm text-gray-700">{listing?.nik}</td>
                <td className="p-3 text-sm text-gray-700">{listing?.nama}</td>
                <td className="p-3 text-sm text-gray-700">{listing?.cabang}</td>
                <td className="p-3 text-sm text-gray-700">{listing?.kpi_1}</td>
                <td className="p-3 text-sm text-gray-700">{listing?.kpi_2}</td>
                <td className="p-3 text-sm text-gray-700">{listing?.kpi_3}</td>
                <td className="p-3 text-sm text-gray-700">
                  <div className="flex gap-3">
                    <div>
                      <button
                        onClick={() => router.push(`/staffs/${listing.id}`)}
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
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={onRent}
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
                        Open Modal
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffClient;
