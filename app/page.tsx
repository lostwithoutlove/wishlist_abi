import Image from "next/image";
import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getListings from "@/app/actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "./components/listings/ListingCard";

export default async function Home({ searchParams }: any) {
  const category = searchParams?.category;
  const currentUser = await getCurrentUser();
  const listings = await getListings({ category, userId: currentUser?.id });

  const isEmpty = true;
  //if (isEmpty) {

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
        <div className="flex">
          <div className="pt-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-10">
            <div className="text-gray-500 text-sm gap-10">
              {listings.map((listing) => (
                <ListingCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                  price={listing.price}
                  brand={listing.brand}
                  product={listing.product}
                ></ListingCard>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}
