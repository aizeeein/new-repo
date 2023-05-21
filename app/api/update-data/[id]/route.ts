import prisma from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { kpi_1, kpi_2, kpi_3 } = req.body;
    const updatedUser = await prisma.data_staff.update({
      where: {
        id: parseInt(id as string),
      },
      data: {
        kpi_1,
        kpi_2,
        kpi_3,
      },
    });
    res.json(updatedUser);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const user = await prisma.data_staff.delete({
      where: { id: parseInt(id as string) },
    });
    res.status(200).json({ message: "delete successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
