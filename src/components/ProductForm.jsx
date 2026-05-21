import { useState } from "react";

function ProductForm({ addProduct }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !quantity) return;

    addProduct({
      id: Date.now(),
      name,
      quantity: Number(quantity)
    });

    setName("");
    setQuantity("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">
        Adicionar
      </button>
    </form>
  );
}

export default ProductForm;