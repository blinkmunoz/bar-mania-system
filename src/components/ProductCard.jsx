function ProductCard({
  product,
  removeProduct,
  updateStock
}) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>

      <p>
        Quantidade: {product.quantity}
      </p>

      <p>
        Preço: R$ {product.price}
      </p>

      {product.quantity <= 5 && (
        <span className="low-stock">
          Estoque baixo
        </span>
      )}

      <div className="buttons">
        <button
          onClick={() =>
            updateStock(product.id, 1)
          }
        >
          +
        </button>

        <button
          onClick={() =>
            updateStock(product.id, -1)
          }
        >
          -
        </button>

        <button
          onClick={() =>
            removeProduct(product.id)
          }
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ProductCard;