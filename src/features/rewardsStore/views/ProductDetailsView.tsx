"use client";
import Empty from "@/components/Empty";
import { RootState } from "@/store/store";
import { Button } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CustomBreadcrumbs from "../components/Breadcrumbs";
import { TProduct } from "../type";
import GalleryImageProduct from "../components/GalleryImageProduct";
import BuyProductFooter from "../components/BuyProductFooter";

type ProductDetailsViewProps = {
  productId: string;
};

function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const products = useSelector((state: RootState) => state.rewards.Products);

  // پیدا کردن محصول
  const product: TProduct | undefined = products.find(
    (p) => String(p.Id) === productId
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
        {/* گالری تصاویر */}
        <GalleryImageProduct
          title={product.Title}
          mainImage={product.MainImage}
          attaches={product.Attaches}
        />

        {/* اطلاعات */}
        <h6 className="text-sm font-bold mb-4">{product.Title}</h6>
        <div className="mb-2 text-xs text-gray-500 flex flex-col gap-2">
          <strong className="text-gray-700 text-xs">معرفی:</strong>
          <p>{product.Description}</p>
        </div>
      </main>

     <BuyProductFooter price={product.Price} />
    </div>
  );
}

export default ProductDetailsView;
