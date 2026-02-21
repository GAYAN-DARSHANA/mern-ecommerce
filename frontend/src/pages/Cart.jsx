import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  return (
    <div>
      <h1>My Cart</h1>

      {cart.map((item) => (
        <div key={item.productId}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <p>Qty: {item.qty}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;