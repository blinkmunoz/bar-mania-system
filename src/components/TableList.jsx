function TableList({ orders }) {
  return (
    <div>
      <h2>Comandas</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="product-card"
        >
          <h3>Mesa {order.table}</h3>

          <p>
            Produto: {order.product}
          </p>

          <p>
            Quantidade: {order.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TableList;