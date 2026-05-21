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
  const [darkMode, setDarkMode] = useState(false);

  // carregar localStorage
  useEffect(() => {
    const savedProducts =
      localStorage.getItem("products");

    const savedOrders =
      localStorage.getItem("orders");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // salvar produtos
  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  // salvar comandas
  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // adicionar produto
  function addProduct(product) {
    setProducts([...products, product]);
  }

  // remover produto
  function removeProduct(id) {
    const updated = products.filter(
      (p) => p.id !== id
    );

    setProducts(updated);
  }

  // atualizar estoque
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

  // criar pedido/comanda
  function createOrder(
    table,
    productId,
    quantity
  ) {
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
      quantity,
      price: product.price,
      total: product.price * quantity,
      status: "Aberta"
    };

    setOrders([...orders, newOrder]);
  }

  // fechar mesa
  function closeOrder(id) {
    const updated = orders.map((order) => {
      if (order.id === id) {
        return {
          ...order,
          status: "Fechada"
        };
      }

      return order;
    });

    setOrders(updated);
  }

  // busca
  const filteredProducts = products.filter((p) =>
    p.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className={
        darkMode
          ? "container dark"
          : "container"
      }
    >
      <Header />

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode
          ? "Modo Claro"
          : "Modo Escuro"}
      </button>

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

      <TableList
        orders={orders}
        closeOrder={closeOrder}
      />

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
