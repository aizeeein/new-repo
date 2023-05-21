import getStaffById from "@/app/actions/getStaffById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import StaffComponent from "./StaffComponents";
import RentModal from "@/app/components/modals/RentModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id: string;
}

const StaffPage = async ({ params }: { params: IParams }) => {
  const staff = await getStaffById(params);
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return(
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
      )
  }

  if (!staff) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <RentModal staff={staff} />
    </ClientOnly>
  );
};

export default StaffPage;
