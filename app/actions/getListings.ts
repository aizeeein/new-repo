import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getListings() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  try {
    const listings = await prisma.data_staff.findMany({
      where: {
        cabang: currentUser?.cabang,
      },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
