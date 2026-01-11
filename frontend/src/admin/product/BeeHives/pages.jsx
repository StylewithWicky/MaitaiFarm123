import { useEffect, useState } from "react";
import { MoreVertical, Trash2, Edit, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import AdminNavBar from "../../../components/AdminNavbar";
import AdminFooter from "../../../components/AdminFooter";
import styles from "../../../styles/products/networkComponent.module.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BeeHives() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchBeeHives = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/get_product_previews?category=BeeHive&page=${page}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setProducts(data.products || []);
      setPagination(data.pagination || {});
    } catch {
      alert("Failed to fetch bee hives");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBeeHives();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this bee hive?")) return;

    const res = await fetch(
      `${BACKEND_URL}/api/delete_product/${id}`,
      { method: "DELETE", credentials: "include" }
    );

    if (res.ok) {
      setProducts(products.filter(p => p.product_id !== id));
    }
  };

  return (
    <>
      <AdminNavBar />

      <div className={styles.container}>
        <h1 className={styles.header}>Bee Hives</h1>

        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.product_id} className={styles.card}>
              <img
                src={
                  product.image
                    ? `${BACKEND_URL}/api/send_image/${product.image}`
                    : "/placeholder.webp"
                }
                alt={product.name}
                className={styles.image}
              />

              <div className={styles.cardBody}>
                <Link
                  to={`/admin/products/bee-hives/${product.product_id}`}
                  className={styles.cardTitle}
                >
                  {product.name}
                </Link>

                <p className={styles.price}>
                  <DollarSign size={14} /> {product.price}
                </p>
              </div>

              <div className={styles.actions}>
                <MoreVertical />
                <div className={styles.dropdown}>
                  <button onClick={() => handleDelete(product.product_id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                  <button>
                    <Edit size={14} /> Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && <p>Loading...</p>}
      </div>

      <AdminFooter />
    </>
  );
}

