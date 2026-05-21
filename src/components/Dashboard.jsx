function Dashboard({ products }) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const lowStock = products.filter(
    (item) => item.quantity <= 5
  ).length;

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Produtos</h3>
        <p>{totalProducts}</p>
      </div>

      <div className="card">
        <h3>Total Estoque</h3>
        <p>{totalStock}</p>
      </div>

      <div className="card warning">
        <h3>Estoque Baixo</h3>
        <p>{lowStock}</p>
      </div>
    </div>

    
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

    {/* LISTA DE PRODUTOS */}
    <ProductList
      products={filteredProducts}
      removeProduct={removeProduct}
      updateStock={updateStock}
    />
  </div>
);


}


export default Dashboard;