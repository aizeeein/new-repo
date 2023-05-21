"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "../inputs/Input";
import { data_staff } from "@prisma/client";

enum STEPS {
  KPI_1 = 0,
  KPI_2 = 1,
  KPI_3 = 2,
}

interface RentModalParams {
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

const RentModal: React.FC<RentModalParams> = ({ staff }) => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.KPI_1);
  const [isLoading, setIsLoading] = useState(false);
  const [kpi_1, setKpi_1] = useState(staff.kpi_1);
  const [kpi_2, setKpi_2] = useState(staff.kpi_2);
  const [kpi_3, setKpi_3] = useState(staff.kpi_3);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (step !== STEPS.KPI_3) {
      return onNext();
    }

    setIsLoading(true);
    rentModal.onClose();

    axios
      .post(`/api/staff/${staff.id}`, [kpi_1, kpi_2, kpi_3])
      .then(() => {
        toast.success("Edited");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.KPI_3) {
      return "Submit";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.KPI_1) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title={staff.nama} subtitle="Bagaimana Capaian bulanan staff?" />
      <div className="flex-col items-center">
        <div>
          <h1>Penilaian</h1>
        </div>
        <div>
          <input
            className="w-10"
            type="number"
            value={kpi_1}
            onChange={(e) => setKpi_1(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );

  if (step === STEPS.KPI_2) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="PENILAIAN KPI 2"
          subtitle="Bagaimana Capaian bulanan staff?"
        />
        <input
          className="w-10"
          type="number"
          value={kpi_2}
          onChange={(e) => setKpi_2(parseInt(e.target.value))}
        />
      </div>
    );
  }

  if (step === STEPS.KPI_3) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="PENILAIAN KPI 3"
          subtitle="Bagaimana Capaian bulanan staff?"
        />
        <hr />
        <input
          className="w-10"
          type="number"
          value={kpi_3}
          onChange={(e) => setKpi_3(parseInt(e.target.value))}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="KSP Mitra"
      onClose={rentModal.onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.KPI_1 ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
