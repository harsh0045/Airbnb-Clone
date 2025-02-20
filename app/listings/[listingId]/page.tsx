import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
   listingId: string;  // ✅ Ensure listingId is required
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => { // ✅ Await params
   
   const para=await params;
   const listing = await getListingById(para);
   if (!listing) {
      return (
         <ClientOnly>
            <EmptyState />
         </ClientOnly>
      );
   } 
   const reservations = await getReservations(para); // ✅ Pass only listingId
   const currentUser = await getCurrentUser();

   return (
      <ClientOnly>
         <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
      </ClientOnly>
   );
};

export default ListingPage;
