"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Empty from "@/components/Empty";
import ProductHeader from "../components/ProductDetails/ProductHeader";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import BuyProductFooter from "../components/ProductDetails/BuyProductFooter";

type ProductDetailsViewProps = {
  productId: string;
};

export default function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const products = useSelector((state: RootState) => state.rewards.Products);

  const product = products.find((p) => String(p.Id) === productId);

  if (!product) {
    return <Empty message="محصول مورد نظر یافت نشد!" />;
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <ProductHeader />

      <main className="overflow-y-auto scrollbar-hide px-2 py-3">
        <ProductGallery title={product.Title} mainImage={product.MainImage ?? undefined} attaches={product.Attaches} />
        <ProductInfo title={product.Title} description={product.Description} />
      </main>

      <BuyProductFooter productId={product.Id} price={product.Price} />
    </div>
  );
}
