import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products/');
    setProducts(response.data);
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id="productList" className="py-5 bg-light">
      <div className="container">
        <h3 className="text-center p-3 pt-3"> Buku Kami</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-lg border-0 rounded-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: '300px', overflow: 'hidden' }}
                >
                  <img
                    src={product.thumbnail}
                    className="card-img-top rounded-top"
                    alt="file"
                    style={{
                      objectFit: 'contain',
                      maxHeight: '100%',
                      width: '100%',
                      backgroundColor: '#f8f9fa',
                    }}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column mb-2">
                  <h5 className="card-title text-truncate fw-bold mb-2">
                    {product.name}
                  </h5>
                </div>
                <div className="card-footer bg-white border-0 px-3 pb-2">
                  <div className="btn-group w-100">
                    <a href={product.url} className="btn btn-outline-secondary">
                      📖 Baca
                    </a>
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-outline-primary"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn btn-outline-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
