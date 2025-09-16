"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import CartItem from "./CartItem";
import { CategoryType, ProductType } from "../type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryPreviewProps {
  category: CategoryType;
  products: ProductType[];
}

function CategoryPreview({ category, products }: CategoryPreviewProps) {
  const pathname = usePathname();

  if (products.length === 0) return null;

  return (
    <div className="w-full mb-4">
      {/* Header */}
      <div className="bg-secondary text-white px-2 pt-3 pb-5 w-full shadow-md flex justify-between items-center">
        <h6 className="text-xs font-semibold">{category.name}</h6>
        <Link href={`${pathname.replace(/\/$/, "")}/${category.id}`}>
          <span className="text-[10px] flex items-center gap-1 cursor-pointer">
            مشاهده همه <FaArrowLeft />
          </span>
        </Link>
      </div>

      {/* Products */}
      <div className="px-2 pb-2 -mt-2 flex gap-3 overflow-x-auto scrollbar-hide w-full">
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPreview;
