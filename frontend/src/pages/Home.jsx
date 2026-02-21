import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const exist = cart.find(item => item._id === product._id);

    if (exist) {
      setCart(
        cart.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Change quantity
  const changeQty = (id, qty) => {
    setCart(
      cart.map(item =>
        item._id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map(p => (
          <div
            key={p._id}
            style={{
              border: "1px solid gray",
              margin: 10,
              padding: 10,
              width: 200
            }}
          >
            <img src={p.image} width="150" alt={p.name} />
            <h3>{p.name}</h3>
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
        <div key={item._id} style={{ marginBottom: 10 }}>
          <strong>{item.name}</strong> — ${item.price}

          <br />

          Qty:
          <input
            type="number"
            value={item.qty}
            min="1"
            onChange={(e) =>
              changeQty(item._id, e.target.value)
            }
            style={{ width: 50, marginLeft: 10 }}
          />

          <button
            onClick={() => removeFromCart(item._id)}
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