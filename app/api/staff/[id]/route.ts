import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const [kpi_1, kpi_2, kpi_3] = body;

  const { id } = params;

  if (!kpi_1 || !kpi_2 || !kpi_3) {
    return NextResponse.error();
  }

  const updateKpi = await prisma.data_staff.update({
    where: {
      id: parseInt(id),
    },
    data: {
      kpi_1,
      kpi_2,
      kpi_3,
    },
  });
  return NextResponse.json(updateKpi);
}
