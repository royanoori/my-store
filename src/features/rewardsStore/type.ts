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

// type.ts
export interface TCategory {
  Title: string;
  Image: string;
  Description: string;
  LowestPrice: number | null;
  HighestPrice: number | null;
}

export interface TGetServicerCurrentScore {
  Score: number;
  Categories: TCategory[];
}

export interface SliderItem {
 Id: string;
  Name: string;
  Url: string;
  Link: string;
  Thumbnail: string;
  ThumbnailName: string;
  IsVideo: boolean;
}