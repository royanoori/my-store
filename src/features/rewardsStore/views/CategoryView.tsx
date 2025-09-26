
import CategoryPage from "../components/Category/CategoryPage";

type CategoryViewProps = {
  category: string; // چون هم می‌تونه name باشه هم Id
};

function CategoryView({ category }: CategoryViewProps) {
  return(
    <CategoryPage category={category}/>
  )
}

export default CategoryView;
