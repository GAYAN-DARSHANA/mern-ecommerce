import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  // Load products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Load cart from backend
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCart(data));
  }, [token]);

  // Add to cart
  const addToCart = async (product) => {
    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product }),
    });

    const data = await res.json();
    setCart(data);
  };

  // Remove item
  const removeFromCart = async (id) => {
    const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data);
  };

  // Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map(p => (
          <div key={p._id} style={{ border: "1px solid gray", margin: 10, padding: 10, width: 200 }}>
            <img src={p.image} width="150" alt={p.title} />
            <h3>{p.title}</h3>
            <p>${p.price}</p>

            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <hr />

      <h2>Cart 🛒</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.productId} style={{ marginBottom: 10 }}>
          <strong>{item.name}</strong> — ${item.price}
          <br />
          Qty: {item.qty}

          <button
            onClick={() => removeFromCart(item.productId)}
            style={{ marginLeft: 10 }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Home;