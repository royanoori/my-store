"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ProductType } from "../type";

interface CartItemProps {
  product: ProductType;
  userScore?: number;
}

function CartItem({ product, userScore = 500 }: CartItemProps) {
  const pathname = usePathname();

  // محاسبه درصد
  const percentage =
    userScore >= product.score
      ? 100
      : Math.round((userScore / product.score) * 100);

  // آیا الان توی صفحه دسته‌بندی هستیم؟
  const inCategoryPage = pathname.split("/").some((p) => p === String(product.categoryId));

  // مسیر نهایی
  const href = inCategoryPage
    ? `${pathname}/${product.id}` // فقط آیدی محصول
    : `${pathname}/${product.categoryId}/${product.id}`; // دسته + محصول

  return (
    <Link
      href={href}
      key={product.id}
      className="bg-white rounded-xl shadow-md p-2 flex-[0_0_40%] flex items-center flex-col justify-between"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={60}
        height={60}
        priority
      />

      <span className="text-[10px] text-gray-700 mt-2 font-semibold text-center">
        {product.name}
      </span>

      <div className="flex justify-between items-end w-full mt-3">
        {/* امتیاز محصول */}
        <div className="flex gap-1 items-center justify-center">
          <span className="text-md text-secondary font-bold">{product.score}</span>
          <span className="text-[8px] text-gray-400">امتیاز</span>
        </div>

        <div className="w-1/2 flex flex-col items-center">
          {/* درصد */}
          <span className="text-[8px] w-full text-left text-gray-400">
            {percentage}%
          </span>

          {/* نوار پیشرفت */}
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CartItem;
