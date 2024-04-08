import prisma from "@/app/libs/prismadb";

//import getCurrentUser from "./getCurrentUser";
//const userId = getCurrentUser().id;
//console.log("userID", userId);

export interface ListingsIParams {
  userId?: string;
  listingId?: string;
  product?: string;
  brand?: string;
  price?: number;
  category?: string;
}

export default async function getListings(params: ListingsIParams = {}) {
  try {
    const { category, userId } = params;
    if (!userId) {
      console.log("No userID provided");
      return [];
    }
    const listings = await prisma.listing.findMany({
      where: { category, userId: userId ? { equals: userId } : undefined },
    });
    console.log("listings", listings);
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
