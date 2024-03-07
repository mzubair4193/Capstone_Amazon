import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../../public/logo-color.png"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Navigation() {
  const user = useSelector((state) => state.session.user)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/all");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    try {
      const products = await fetchProducts();
      const sortedProducts = products.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      const results = sortedProducts.filter(product =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <ul className="navigation-container" >
      <img src={logo} className="business-logo" onClick={() => navigate("/")} />
      {/* <br /> */}
      <div className="create-prod-btn">
        { user && <OpenModalButton 
          buttonText={"Create A Product"}
          modalComponent={
            <div className="create-product-modal">
              <CreateProduct className='create-prod-btn'/>
            </div>
          }
          className='create-prod-btn'
          />}
      </div>
      <div>
      <div className='nav-search-main-cont'>
        <input
          className='search-bar'
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        {searchQuery && searchResults.length > 0 && (
          <div className="search-results-container">
            <ul className="search-results-list">
              {searchResults.map(result => (
                <NavLink key={result.id} to={`/products/${result.id}`} onClick={clearSearch} className="search-result">
                  <img src={result.image} className="result-img" alt={result.name} />
                  <div className="result-details">
                    <h2 className="itemname">{result.name}</h2>
                    {/* <h3 className="proddesc">{result.description}</h3> */}
                    {/* <p className="price">${result.price}</p> */}
                  </div>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
        <ProfileButton />
          </ul>
  );
        }

export default Navigation;