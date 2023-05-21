import getListings from "./actions/getListings";
import Button from "./components/Button";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import StaffClient from "./components/StaffClient";

export default async function Home() {
  const listings = await getListings();

  return (
    <ClientOnly>
      <Container>
        <StaffClient listings={listings} />
      </Container>
    </ClientOnly>
  );
}
