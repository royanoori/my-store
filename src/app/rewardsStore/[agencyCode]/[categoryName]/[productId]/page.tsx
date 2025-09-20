

import CategoryView from '@/features/rewardsStore/views/CategoryView';
import ProductDetailsView from '@/features/rewardsStore/views/ProductDetailsView';
import React from 'react'
interface pageProps {
 params: Promise<{ agencyCode: string; categoryName: string; productId: string }>;
 searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
const ProductPage = async  ({params, searchParams}:pageProps) => {
  const {agencyCode, categoryName,productId} = await params;
  return (
    <ProductDetailsView productId = {productId} />
  )
}

export default ProductPage