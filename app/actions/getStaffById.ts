import prisma from "@/app/libs/prismadb";

interface IParams {
  id: string;
}

export default async function getStaffById(params: IParams) {
  try {
    const { id } = params;

    const staff = await prisma.data_staff.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!staff) {
      return null;
    }

    return staff;
  } catch (error: any) {
    throw new Error(error);
  }
}
