"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
   title: string;
   imageSrc: string;
   locationValue: string;
   id: string;
   currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
   title,
   imageSrc,
   locationValue,
   id,
   currentUser,
}) => {
   const { getByValue } = useCountries();
   const location = getByValue(locationValue);

   return (
      <div className="pt-20">
        <div className="pt-5">
        <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
        </div>
         
         <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image alt={title} src={imageSrc} fill className="object-cover w-full" />
            <div className="absolute top-5 right-5">
               <HeartButton listingId={id} currentUser={currentUser} />
            </div>
         </div>
      </div>
   );
};

export default ListingHead;