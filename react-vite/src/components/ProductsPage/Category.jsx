import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductsByCategory = () => {
  const { category } = useParams(); // Extract category from route parameters
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(category, 'these are the products!!!!!')
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`/api/products/category/${category}`);
        if (!response.ok) {
          throw new Error('Could not fetch products');
        }
        const productsData = await response.json();
        setProducts(productsData.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]); // Re-fetch products when category changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {/* Add other product details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsByCategory;
