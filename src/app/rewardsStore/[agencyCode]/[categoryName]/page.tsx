import CategoryView from '@/features/rewardsStore/views/CategoryView';
import React from 'react'
interface pageProps {
 params: Promise<{ agencyCode: string; categoryName: string }>;
 searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
const CategoryPage = async  ({params, searchParams}:pageProps) => {
  const {agencyCode, categoryName} = await params;
  return (
    <CategoryView category = {categoryName} />
  )
}

export default CategoryPage