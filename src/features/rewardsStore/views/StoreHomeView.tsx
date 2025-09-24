"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setData } from "../redux/rewardsSlice";

import Loading from "@/app/loading";
import Empty from "@/components/Empty";


import { useGetSlides } from "../hooks/useGetSlides";
import { useGetProductList } from "../hooks/useGetProductList";
import StoreHeader from "../components/StoreHome/StoreHeader";
import CategoryPreviewList from "../components/StoreHome/CategoryPreviewList";
import StoreSlider from "../components/StoreHome/StoreSlider";

export default function StoreHomeView() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: sliders, isSuccess: isSlidesSuccess } = useGetSlides({ enabled: true });
  const { data: productData, isLoading, isSuccess: isProductsSuccess } = useGetProductList({ enabled: true });

  // ذخیره داده در ریداکس
  useEffect(() => {
    if (productData) dispatch(setData(productData.Data));
  }, [productData, dispatch]);

  // دسته‌هایی که محصول دارند
  const categoriesWithProducts = useMemo(() => {
    if (!productData) return [];
    return productData.Data.Categories.filter((category) =>
      productData.Data.Products.some((p) => p.Category === category.Id)
    );
  }, [productData]);

  if (isLoading) return <Loading />;
  if (!productData || productData.Data.Products.length === 0) return <Empty message="محصولی یافت نشد" />;

  return (
    <>
      <StoreHeader categories={categoriesWithProducts} />
      <main className="pt-1 overflow-auto">
        {isSlidesSuccess && sliders?.Data?.length > 0 && <StoreSlider slides={sliders.Data} />}
        <CategoryPreviewList categories={categoriesWithProducts} products={productData.Data.Products} />
      </main>
    </>
  );
}
