"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductType } from "../type";
import Empty from "@/components/Empty";
import CustomBreadcrumbs from "../components/Breadcrumbs";
import { Button } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import ImageSlider from "../components/ImageSlider";
import Image from "next/image";

type ProductDetailsViewProps = {
 productId: string; // ایدی محصول از روت
};

function ProductDetailsView({ productId }: ProductDetailsViewProps) {
 const products = useSelector((state: RootState) => state.rewards.Products);

 // پیدا کردن محصول
 const product: ProductType | undefined = products.find(
  (p) => String(p.id) === productId
 );

 if (!product) {
  return <Empty message="محصول مورد نظر یافت نشد!" />;
 }

 return (
  <div className="flex flex-col h-full justify-between">
   <header className="px-2">
    <CustomBreadcrumbs />
   </header>
   <main className="overflow-y-auto scrollbar-hide px-2 py-3">
    <Image
     src={product.image}
     alt={product.name}
     width={300}
     height={300}
     className="w-full h-60 md:h-96 object-cover rounded-lg mb-4"
     priority
    />

    <h6 className="text-sm font-bold mb-4">{product.name}</h6>
    <div className="mb-2 text-xs text-gray-500 flex flex-col gap-2">
     <strong className="text-gray-700 text-xs">معرفی:</strong>
     <p>{product.description}</p>
    </div>
   </main>
   <footer className="p-2 border-t border-gray-100 flex justify-between items-center">
    <Button
     startIcon={<FaCartShopping size={12} className="ml-2" />}
     variant="contained"
     className="w-3/12"
     color="secondary"
     size="medium"
    >
     خرید
    </Button>
    <div className="flex gap-1 items-center justify-center">
     <span className="text-xl text-secondary font-bold">{product.score}</span>
     <span className="text-[8px] text-gray-400">امتیاز</span>
    </div>
   </footer>
  </div>
 );
}

export default ProductDetailsView;
