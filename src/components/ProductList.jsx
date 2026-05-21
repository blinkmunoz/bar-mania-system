import ProductCard from "./ProductCard";

function ProductList({
  products,
  removeProduct,
  updateStock
}) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          removeProduct={removeProduct}
          updateStock={updateStock}
        />
      ))}
    </div>
  );
}

export default ProductList;