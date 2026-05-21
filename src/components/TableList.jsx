function TableList({ orders, closeOrder }) {
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

          <p>
            Total: R$ {order.total}
          </p>

          <p>
            Status: {order.status}
          </p>

          {order.status === "Aberta" && (
            <button
              onClick={() =>
                closeOrder(order.id)
              }
            >
              Fechar Mesa
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TableList;