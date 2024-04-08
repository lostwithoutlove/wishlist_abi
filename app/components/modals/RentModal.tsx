"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(
    () => [
      { value: "wishlist", label: "Wishlist" },
      { value: "order", label: "Order" },
      { value: "wardrobe", label: "Wardrobe" },
      { value: "vanity", label: "Vanity" },
      { value: "accessories", label: "Accessories" },
    ],
    []
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { category: "", brand: "", product: "", price: "", url: "" },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const selectedCategory = data.category;
    const category = categories.find(
      (category) => category.value === selectedCategory
    );
    if (category) {
      data.category = category.label;
    }

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Product created successfully!");
        router.refresh();
        reset();
        rentModal.onClose();
        router.push("/");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Create your WishList?" subtitle="Let's get started" />
      <Input
        id="brand"
        label="Brand Name"
        type="string"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="product"
        label="Product Name"
        type="string"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="price"
        formatPrice
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="url"
        label="URL"
        type="string"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div>
        <div className="flex flex-col">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="border border-gray-300 rounded p-2"
            disabled={isLoading}
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Wish. List. Share."
      body={bodyContent}
      actionLabel="Create"
    />
  );
};

export default RentModal;
