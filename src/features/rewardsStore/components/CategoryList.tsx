import React from "react";
import CategoryItem from "./CategoryItem";
import { CategoryType } from "../type";


interface CategoryListProps {
  categories: CategoryType[];
}
function CategoryList( {categories} : CategoryListProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 w-max">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id}
            id={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
