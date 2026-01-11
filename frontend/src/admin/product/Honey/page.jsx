import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavBar from "../../../components/AdminNavbar";
import AdminFooter from "../../../components/AdminFooter";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function HoneyDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products/${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <AdminNavBar />

      <div className="container">
        <h1>{product.name}</h1>

        <img
          src={`${BACKEND_URL}/api/send_image/${product.image}`}
          alt={product.name}
          width="400"
        />

        <p>Price: KES {product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>{product.description}</p>
      </div>

      <AdminFooter />
    </>
  );
}
