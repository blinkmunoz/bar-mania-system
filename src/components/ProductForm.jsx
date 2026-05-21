import { useState } from "react";

function ProductForm({ addProduct }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !quantity || !price) return;

    addProduct({
      id: Date.now(),
      name,
      quantity: Number(quantity),
      price: Number(price)
    });

    setName("");
    setQuantity("");
    setPrice("");
  }

  return (
    <>
      <h2>Registrar Produto</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button type="submit">
          Adicionar
        </button>
      </form>
    </>
  );
}

export default ProductForm;