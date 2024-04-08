import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { brand, product, price, url, category } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      brand,
      product,
      url,
      price: parseInt(price, 10),
      category,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
  console.log("listing after writing in mongo", listing);
}

// handler for a GET request that gets a listing by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  return NextResponse.json(listing);
}
