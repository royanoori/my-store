// تایپ یک دسته بندی
export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

// تایپ یک محصول
export interface ProductType {
  id: number;
  name: string;
  categoryId: number; // آی‌دی دسته‌بندی مربوطه
  description: string;
  score: number;
  image: string;
}

// تایپ کل داده‌ها
export interface DataType {
  Category: CategoryType[];
  Products: ProductType[];
}