export const dynamic = "force-dynamic";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
   searchParams: Promise<IListingParams>; // ✅ Expect a Promise
}

const Home = async ({ searchParams }: HomeProps) => {
   const params = await searchParams; // ✅ Await searchParams

   const listings = await getListings(params);
   const currentUser = await getCurrentUser();

   if (listings.length === 0) {
      return (
         <ClientOnly>
            <EmptyState showReset />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <Container>
            <div className="pt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
               {listings.map((listing) => (
                  <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
               ))}
            </div>
         </Container>
      </ClientOnly>
   );
};

export default Home;
