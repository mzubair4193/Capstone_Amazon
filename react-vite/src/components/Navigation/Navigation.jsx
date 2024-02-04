import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user)
  return (
    <ul className="navigation-container" >
      <div>
        <NavLink to="/">Home</NavLink>
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
