"use client";
import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import CategoryPreview from "../components/CategoryPreview";
import { DataType } from "../type";
import Empty from "@/components/Empty";
import product from "../data.json";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/rewardsSlice";
import { AppDispatch, RootState } from "@/store/store";

import { setScore } from "../redux/userSlice";

function UserNameView() {
 const dispatch = useDispatch<AppDispatch>();

 useEffect(() => {
  dispatch(setData(product as DataType));
 }, [dispatch]);

 const data = useSelector((state: RootState) => state.rewards);

 // فقط دسته‌هایی که محصول دارند
 const categoriesWithProducts = data.Category.filter((category) =>
  data.Products.some((product) => product.categoryId === category.id)
 );
 return (
  <>
   {data.Products.length === 0 ? (
    <Empty message="محصولی یافت نشد" />
   ) : (
    <>
     {categoriesWithProducts.length > 0 && (
      <header className="p-2">
       <CategoryList categories={categoriesWithProducts} />
      </header>
     )}

     <main className="pt-3 overflow-auto">
      {categoriesWithProducts.map((category) => {
       const products = data.Products.filter(
        (p) => p.categoryId === category.id
       );
       if (products.length === 0) return null; // دسته خالی → هیچی نشون داده نمیشه
       return (
        <CategoryPreview
         key={category.id}
         category={category}
         products={products}
        />
       );
      })}
     </main>
    </>
   )}
  </>
 );
}

export default UserNameView;
