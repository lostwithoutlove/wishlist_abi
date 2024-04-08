"use client";
import { LinkPreviewData, replaceSpecialCharacters } from "@/utils/helpers";
import React, { useState, useEffect } from "react";
import IconInput from "../inputs/IconInput";
import { RiInstagramFill } from "react-icons/ri";
import Image from "next/image";

interface LinkPreviewProps {
  url: string;
  price: number;
  brand: string;
  product: string;
  id: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  price,
  brand,
  product,
  id,
}) => {
  const [previewData, setPreviewData] = useState<LinkPreviewData | null>(null);
  const extractLinkPreviewData = (htmlContent: string): LinkPreviewData => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const title =
      doc.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
      "";
    const description =
      doc
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content") || "";
    const image =
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
      undefined;

    return { title, description, image };
  };

  // log id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const htmlContent = await response.text();
        const data = extractLinkPreviewData(htmlContent);
        setPreviewData(data);
      } catch (error) {
        console.error("Error fetching link preview:", error);
      }
    };

    fetchData();
  }, [url]);

  if (!previewData) {
    return null; // Render a loading state or fallback
  }

  const { title, description, image } = previewData;
  const onSubmitIconInput = async (submittedString: string) => {
    console.log("pressed icon", submittedString);
    // await addListingSocial({ instagramUrl: submittedString, listingId: id });
  };

  /*<h3>{title}</h3> taken from inside the return function */
  const slug = replaceSpecialCharacters((brand + " " + title).toLowerCase());

  return (
    // navigate to listing page with id as title
    <div className=" hover:bg-slate-100 cursor-pointer group ">
      <a href={`listings/${slug}?id=${id}`} className="" target="_blank">
        <div className=" justify-center">
          {image && (
            <img
              src={image}
              alt={title}
              width={200}
              className="object-cover hover:scale-110 "
            />
          )}
        </div>
        <div className="m-2">
          <div className="font-semibold text-sm ">{brand}</div>
          <div className=" text-sm truncate">{product}</div>
          <div className="font-semibold text-sm hover:font-bold">
            Rs.{price}
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkPreview;
