import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "300px" }}
      />

      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>

      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;