import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest } from "next/server";

// Fix: Accept context as a single parameter and destructure inside the function
export async function POST(request: NextRequest, context: { params: { listingId: string } }) {
   const { params } = context;
   const currentUser = await getCurrentUser();
   if (!currentUser) return NextResponse.error();

   const listingId = params?.listingId;
   if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

   const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

   const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
   });

   return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, context: { params: { listingId: string } }) {
   const { params } = context;
   const currentUser = await getCurrentUser();
   if (!currentUser) return NextResponse.error();

   const listingId = params?.listingId;
   if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

   const favoriteIds = (currentUser.favoriteIds || []).filter((id) => id !== listingId);

   const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
   });

   return NextResponse.json(user);
}
