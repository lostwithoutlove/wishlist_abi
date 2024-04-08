"use client";
import { LinkPreviewData, replaceSpecialCharacters } from "@/utils/helpers";
import React, { useState, useEffect } from "react";
import IconInput from "../inputs/IconInput";
import { RiInstagramFill } from "react-icons/ri";

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
    <div>
      <a
        href={`listings/${slug}?id=${id}`}
        className="bg-blue border hover:shadow"
        target="blank"
      >
        {image && <img src={image} alt={title} />}
        <div className="p-2">
          <div className="font-semibold text-lg">{brand}</div>
          <div className="text-sm">{product}</div>
          <div className="font-semibold text-ml"> {price}</div>
        </div>
      </a>
      <div className="row-start-auto">
        <IconInput
          callback={onSubmitIconInput}
          iconComponent={<RiInstagramFill />}
        />
      </div>
    </div>
  );
};

export default LinkPreview;
