import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import "./styles/global.css";
import OrderForm from "./components/OrderForm";
import TableList from "./components/TableList";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  // carregar localStorage
  useEffect(() => {
    const saved = localStorage.getItem("products");

    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // salvar localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function addProduct(product) {
    setProducts([...products, product]);
  }

  function removeProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  }

  function updateStock(id, amount) {
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          quantity: p.quantity + amount
        };
      }

      return p;
    });

    setProducts(updated);
  }

  function createOrder(table, productId, quantity) {
    const product = products.find(
      (p) => p.id === productId
    );

    if (!product) return;

    // impedir estoque negativo
    if (product.quantity < quantity) {
      alert("Estoque insuficiente");
      return;
    }

    // diminuir estoque
    const updatedProducts = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          quantity: p.quantity - quantity
        };
      }

      return p;
    });

    setProducts(updatedProducts);

    // salvar pedido
    const newOrder = {
      id: Date.now(),
      table,
      product: product.name,
      quantity
    };

    setOrders([...orders, newOrder]);
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Header />

      <Dashboard products={products} />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <ProductForm addProduct={addProduct} />

      {/* COMANDAS */}
      <OrderForm
        products={products}
        createOrder={createOrder}
      />

      <TableList orders={orders} />

      {/* PRODUTOS */}
      <ProductList
        products={filteredProducts}
        removeProduct={removeProduct}
        updateStock={updateStock}
      />
    </div>
  );
}

export default App;