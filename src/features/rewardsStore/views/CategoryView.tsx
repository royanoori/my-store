"use client";
import Empty from "@/components/Empty";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CustomBreadcrumbs from "../components/Breadcrumbs";
import CartItem from "../components/CartItem";
import { TCategory, TProduct } from "../type";

type CategoryViewProps = {
  category: string; // اینجا categoryName یا categoryId به عنوان رشته
};

function CategoryView({ category }: CategoryViewProps) {
  const data = useSelector((state: RootState) => state.rewards);

  // پیدا کردن آی‌دی دسته بندی بر اساس نام یا Id
  const categoryItem: TCategory | undefined = data.Categories.find(
    (cat) => cat.Title === category || String(cat.Id) === category
  );

  // اگر دسته بندی پیدا نشد
  if (!categoryItem) {
    return <Empty message="دسته بندی مورد نظر یافت نشد!" />;
  }

  // فیلتر و مرتب‌سازی محصولات بر اساس دسته بندی و status
  const products: TProduct[] = data.Products
    .filter((product) => product.Category === categoryItem.Id)
    .sort((a, b) => {
      if (a.Status && !b.Status) return -1; // فعال‌ها جلو
      if (!a.Status && b.Status) return 1;  // غیرفعال‌ها عقب
      return 0;
    });

  if (products.length === 0) {
    return (
      <Empty message={`محصولی برای دسته بندی ${categoryItem.Title} یافت نشد!`} />
    );
  }

  return (
    <>
      <header className="px-2">
        <CustomBreadcrumbs />
      </header>

      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto scrollbar-hide px-2 py-3">
        {products.map((product) => (
          <CartItem key={product.Id} product={product} />
        ))}
      </main>
    </>
  );
}

export default CategoryView;
