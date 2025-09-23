"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TProduct } from "../type";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CartItemProps {
 product: TProduct;
 mainPage?: boolean;
}

function CartItem({ product, mainPage = false }: CartItemProps) {
 const pathname = usePathname();
 const userScore = useSelector((state: RootState) => state.user.score) ?? 0;

 // محاسبه درصد
 const percentage =
  userScore >= product.Price
   ? 100
   : Math.max(1, Math.round((userScore / product.Price) * 100));

 // آیا الان توی صفحه دسته‌بندی هستیم؟
 const inCategoryPage = pathname
  .split("/")
  .some((p) => p === String(product.Category));

 // مسیر نهایی
 const href = inCategoryPage
  ? `${pathname}/${product.Id}`
  : `${pathname}/${product.Category}/${product.Id}`;

 // محتوای کارت (مشترک برای لینک و div)
 const content = (
  <div
   className={`rounded-xl shadow-md p-2  flex items-center flex-col justify-between ${
    product.Status ? "bg-white" : "bg-gray-100 text-gray-500"
   }`}
  >
   {/* Badge */}
   <div className="w-full flex mb-1">
    {mainPage && product.Status ? (
     <div className="z-10 border border-dashed border-green-300/60 bg-green-400/10 text-green-800 text-[10px] px-2 py-1 rounded-lg">
      جدید
     </div>
    ) : !product.Status ? (
     <div className="z-10 border border-dashed border-gray-300/60 bg-gray-400/10 text-gray-800 text-[10px] px-2 py-1 rounded-lg">
      ناموجود
     </div>
    ) : null}
   </div>

   {/* تصویر */}
   <div className="w-24 h-24 rounded-xl overflow-hidden relative">
    <Image
     src={product.MainImage ?? "/images/logo.png"}
     alt={product.Title}
     priority
     fill
     sizes="96px"
     className={`object-cover w-full h-full ${
      !product.MainImage ? "filter grayscale opacity-20" : ""
     }`}
    />
   </div>

   {/* عنوان */}
   <span
    className={`text-[10px] mt-2 font-semibold text-center ${
     product.Status ? "text-black" : "text-gray-400"
    }`}
   >
    {product.Title}
   </span>

   {/* امتیاز و درصد */}
   <div className="w-full mt-3">
    <div className="flex gap-1 items-center justify-center">
     <span
      className={`text-xs font-bold ${
       product.Status ? "text-secondary" : "text-gray-400"
      }`}
     >
      {product.Price}
     </span>
     <span className="text-[8px] text-gray-400">امتیاز</span>
    </div>

    <div className="flex flex-col items-center">
     <span className="text-[8px] w-full text-left text-gray-400">
      {percentage}%
     </span>

     <div className="w-full bg-gray-300 h-2 rounded-full">
      <div
       className={` h-2 rounded-full ${
        product.Status ? "bg-primary" : "bg-gray-500"
       }`}
       style={{ width: `${percentage}%` }}
      ></div>
     </div>
    </div>
   </div>
  </div>
 );

 // اگر محصول موجود نبود → div بدون لینک
 if (!product.Status) {
  return (
   <div className="cursor-not-allowed select-none flex-[0_0_45%]">
    {content}
   </div>
  );
 }

 // اگر موجود بود → لینک
 return (
  <Link href={href} key={product.Id} className="flex-[0_0_45%]">
   {content}
  </Link>
 );
}

export default CartItem;
