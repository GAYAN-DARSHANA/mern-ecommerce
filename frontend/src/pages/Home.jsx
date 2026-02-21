import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map((p) => (
        <Link key={p._id} to={`/product/${p._id}`}>
          <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <img src={p.image} alt={p.title} width="150" />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
          </div>
        </Link>
      ))}

    </div>
  );
};

export default Home;