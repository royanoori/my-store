"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { TCategory, TProduct } from "../../type";
import CartItem from "../Peroduct/CartItem";

interface CategoryPreviewProps {
 category: TCategory;
 products: TProduct[];
}

function CategoryPreview({ category, products }: CategoryPreviewProps) {
 const pathname = usePathname();

 if (products.length === 0) return null;
 // فقط ۵ محصول اول
 const firstFiveProducts = products.slice(0, 5);
 return (
  <div className="w-full mb-4">
   <div className="bg-secondary text-white px-2 pt-3 pb-5 w-full shadow-md flex justify-between items-center">
    <h6 className="text-xs font-semibold">{category.Title}</h6>
    <Link href={`${pathname.replace(/\/$/, "")}/${category.Id}`}>
     <span className="text-[10px] flex items-center gap-1 cursor-pointer">
      مشاهده همه <FaArrowLeft />
     </span>
    </Link>
   </div>
   <div className="px-2 pb-2 -mt-2 flex gap-3 overflow-x-auto scrollbar-hide w-full">
    {firstFiveProducts.map((product) => (
     <CartItem key={product.Id} product={product} mainPage={true} />
    ))}
   </div>
  </div>
 );
}

export default CategoryPreview;
