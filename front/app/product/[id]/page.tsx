// ./app/product/[id]/page.tsx

import React from "react";
// other imports...
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import ProductDetailU from "@/components/ProductDetailU/ProductDetailU";

const ProductDetailPage = ({params}) => {
  console.log("params", params);
  
  // Your component logic...
  return (
<>

    <ProductDetail params={params}/>
</>
  );
};

export default ProductDetailPage;
