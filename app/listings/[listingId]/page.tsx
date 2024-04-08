import React from "react";
import getCurrentUser from "@/app/actions/getCurrentUser";
//import getListingById from "@/app/actions/getListingbyId";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  //const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  return <div>Individual Listing page</div>;
};

export default ListingPage;
