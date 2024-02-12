import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../../public/logo-color.png"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navigation() {
  const user = useSelector((state) => state.session.user)
  const navigate = useNavigate()
  const [value,setValue] = useState()
  return (
    <ul className="navigation-container" >
        <img src={logo} className="business-logo" onClick={() => navigate("/")} />
      <div className='nav-search-main-cont'>
      <input

        className='search-bar'
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />


      </div>
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
        <ProfileButton />
      </div>
    </ul>
  );
}

export default Navigation;
// className={'product-create-btn'}