import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="navigation-container" >
      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>
    </ul>
  );
}

export default Navigation;
