"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import { useRouter } from "next/router";

export const categories = [
  {
    label: "Wishlist",
    icon: TbBeach,
    description: "This is my WishList!",
  },
  {
    label: "Order",
    icon: GiWindmill,
    description: "These are my Current Orders",
  },
  {
    label: "Wardrobe",
    icon: MdOutlineVilla,
    description: "These items are in my Wardrobe!",
  },
  {
    label: "Vanity",
    icon: TbMountain,
    description: "Skincare, Haircare, Makeup, and more!",
  },
  {
    label: "Accessories",
    icon: TbPool,
    description: "Bags, Shoes, and Jewellery!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
      flex
      flex-row
      items-center
      justify-between
      overflow-x-auto
      "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
            //onClick={() => router.push(`/?category=${item.label}`)}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
