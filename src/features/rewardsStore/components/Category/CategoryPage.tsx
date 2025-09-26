"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CategoryHeader from "./CategoryHeader";
import CategoryEmpty from "./CategoryEmpty";
import ProductGrid from "./ProductGrid";
import { TProduct } from "../../type";

type CategoryPageProps = {
  category: string | number;
};

function CategoryPage({ category }: CategoryPageProps) {
  const { Categories, Products } = useSelector((state: RootState) => state.rewards);

  const categoryItem = Categories.find(
    (cat) => String(cat.Id) === String(category)
  );

  if (!categoryItem) {
    return (
      <>
        <CategoryHeader />
        <CategoryEmpty message="دسته‌بندی مورد نظر یافت نشد!" />
      </>
    );
  }

  const products: TProduct[] = Products
    .filter((product) => product.Category === categoryItem.Id)
    .sort((a, b) => Number(b.Status) - Number(a.Status));

  if (products.length === 0) {
    return (
      <>
        <CategoryHeader />
        <CategoryEmpty message={`محصولی برای دسته‌بندی ${categoryItem.Title} یافت نشد!`} />
      </>
    );
  }

  return (
    <>
      <CategoryHeader />
      <ProductGrid products={products} />
    </>
  );
}

export default CategoryPage;
