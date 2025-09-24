"use client";
import Empty from "@/components/Empty";
import { AppDispatch } from "@/store/store";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import CategoryList from "../components/CategoryList";
import CategoryPreview from "../components/CategoryPreview";
import { setData } from "../redux/rewardsSlice";
import Slider from "../components/Slider";
import { useGetSlides } from "../hooks/useGetSlides";
import { useGetProductList } from "../hooks/useGetProductList";
import Loading from "@/app/loading";

function UserNameView() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: sliders, isSuccess } = useGetSlides({ enabled: true });
  const {
    data: ProductList,
    isLoading,
    isSuccess: isSuccessProductList,
  } = useGetProductList({ enabled: true });

  // ذخیره داده در ریداکس
  useEffect(() => {
    if (ProductList) {
      dispatch(setData(ProductList.Data)); // دقت کن: ساختار API → Data.Products , Data.Categories
    }
  }, [isSuccessProductList, dispatch]);

  // فقط دسته‌هایی که محصول دارند
  const categoriesWithProducts = useMemo(() => {
    if (!ProductList) return [];
    return ProductList.Data.Categories.filter((category) =>
      ProductList.Data.Products.some((product) => product.Category === category.Id)
    );
  }, [ProductList]);

  if (isLoading ) {
    return (
      <Loading/>
    )
  } else {
    return (
      <>
      { ProductList?.Data.Products.length === 0 ? (
          <Empty message="محصولی یافت نشد" />
        ) : (
          <>
            {categoriesWithProducts.length > 0 && (
              <header className="p-2">
                <CategoryList categories={categoriesWithProducts} />
              </header>
            )}
  
            <main className="pt-1 overflow-auto">
              {isSuccess && sliders?.Data?.length > 0 && (
                <Slider images={sliders.Data} />
              )}
  
              {categoriesWithProducts.map((category) => {
                const products = ProductList?.Data.Products.filter(
                  (p) => p.Category === category.Id
                );
                if (products?.length === 0) return null;
  
                return (
                  <CategoryPreview
                    key={category.Id}
                    category={category}
                    products={products?? []}
                  />
                );
              })}
            </main>
          </>
        )}
      </>
    );
  }

}

export default UserNameView;
