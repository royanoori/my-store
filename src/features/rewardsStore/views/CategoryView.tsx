"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductType, CategoryType } from "../type";
import CartItem from "../components/CartItem";
import Empty from "@/components/Empty";
import CustomBreadcrumbs from "../components/Breadcrumbs";

type CategoryViewProps = {
 category: string; // اینجا categoryName یا categoryId به عنوان رشته
};

function CategoryView({ category }: CategoryViewProps) {
 const data = useSelector((state: RootState) => state.rewards);

 // پیدا کردن آی‌دی دسته بندی بر اساس نام
 const categoryItem: CategoryType | undefined = data.Category.find(
  (cat) => cat.name === category || String(cat.id) === category
 );

 // اگر دسته بندی پیدا نشد
 if (!categoryItem) {
  return <Empty message="دسته بندی مورد نظر یافت نشد!" />;
 }

 // فیلتر کردن محصولات بر اساس دسته بندی
 const products: ProductType[] = data.Products.filter(
  (product) => product.categoryId === categoryItem.id
 );

 if (products.length === 0) {
  return (
   <Empty message={`محصولی برای دسته بندی ${categoryItem.name} یافت نشد!`} />
  );
 }

 return (
  <>
   <header className="px-2">
    <CustomBreadcrumbs />
   </header>
   <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto scrollbar-hide px-2 py-3">
    {products.map((product) => (
     <CartItem key={product.id} product={product} />
    ))}
   </main>
  </>
 );
}

export default CategoryView;
