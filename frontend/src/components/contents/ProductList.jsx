import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products/');
    setProducts(response.data);
  };
  return (
    <section id="productList" className="py-5">
      <div className="container">
        <h3 className="text-center pb-4">Buku Kami</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt="file"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="d-flex justify-content-center gap-2 mt-auto">
                    <a href={product.url} className="btn btn-primary">
                      Baca
                    </a>
                    <a href={product.url} className="btn btn-success">
                      Download
                    </a>
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
