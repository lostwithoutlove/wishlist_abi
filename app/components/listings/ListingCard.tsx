"use client";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/app/types";
import LinkPreview from "./LinkPreview";

type User = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
  favoriteIDs: string[];
} | null;
type ListingCardProps = {
  data: Listing;
  price: number;
  brand: string;
  product: string;
  currentUser: User | null;
};

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const price = data.price;

  return (
    <div className="gap-2 hover:bg-slate-300 cursor-pointer group">
      <LinkPreview
        url={data.url}
        price={price}
        product={data.product}
        brand={data.brand}
        id={data.id}
      />
    </div>
  );
};
export default ListingCard;
