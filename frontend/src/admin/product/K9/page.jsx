import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavBar from "../../../components/AdminNavbar";
import AdminFooter from "../../../components/AdminFooter";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function K9Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${BACKEND_URL}/api/products/${id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
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

        <p>Price: {product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Description: {product.description}</p>
      </div>

      <AdminFooter />
    </>
  );
}
