import { useState } from "react";

function OrderForm({ products, createOrder }) {
  const [table, setTable] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!table || !productId || !quantity) {
      alert("Preencha todos os campos");
      return;
    }

    createOrder(
      table,
      Number(productId),
      Number(quantity)
    );

    setTable("");
    setProductId("");
    setQuantity(1);
  }

  return (
    <>
      <h2>Adicionar Mesa</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mesa"
          value={table}
          onChange={(e) =>
            setTable(e.target.value)
          }
        />

        <select
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
        >
          <option value="">
            Selecione produto
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} - R$ {product.price}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <button type="submit">
          Fazer Pedido
        </button>
      </form>
    </>
  );
}

export default OrderForm;