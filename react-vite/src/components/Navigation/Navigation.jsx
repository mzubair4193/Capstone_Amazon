import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navigation() {
  const user = useSelector((state) => state.session.user)
  const [value,setValue] = useState()
  return (
    <ul className="navigation-container" >
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className='nav-search-main-cont'>
      <input

        className='search-bar'
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />


      </div>

    { user && <OpenModalButton 
        buttonText={"Create A Product"}
        modalComponent={<CreateProduct />}
       />}

      <div>
        <ProfileButton />
      </div>
    </ul>
  );
}

export default Navigation;
