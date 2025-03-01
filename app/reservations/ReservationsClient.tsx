"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
   reservations: SafeReservation[];
   currentUser: SafeUser | null | undefined ;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
   const router = useRouter();
   const [deletingId, setDeletingId] = useState("");

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);

         axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
               toast.success("Reservation Canceled");
               router.refresh();
            })
            .catch(() => {
               toast.error("Something went wrong");
            })
            .finally(() => {
               setDeletingId("");
            });
      },
      [router]
   );

   return (
      <Container>
        <div className="pt-20">
            <div className="pt-5">
            <Heading title="Reservations" subtitle="Bookings on your properties" />
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
               <ListingCard
                  key={reservation.id}
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel="Cancel guest reservation"
                  currentUser={currentUser}
               />
            ))}
         </div>

        </div>
        
        
      </Container>
   );
};

export default ReservationsClient;