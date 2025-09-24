import CategoryList from "../CategoryList";
import { TCategory } from "../../type";

interface StoreHeaderProps {
  categories: TCategory[];
}

export default function StoreHeader({ categories }: StoreHeaderProps) {
  if (!categories?.length) return null;

  return (
    <header className="p-2">
      <CategoryList categories={categories} />
    </header>
  );
}
