import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ listingId: string }> } // ✅ params is a Promise
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = await params; // ✅ Await params before accessing properties

  if (!listingId)  return NextResponse.error();

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listingId: string }> } // ✅ params is a Promise
){
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = await params; // ✅ Await params before accessing properties

  if (!listingId) return NextResponse.json({ error: "Invalid Id" }, { status: 400 });

  let favoriteIds = [...(currentUser.favoriteIds || [])].filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
