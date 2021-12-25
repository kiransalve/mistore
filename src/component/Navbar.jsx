import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_mistore.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../config/Config";
import { useHistory } from "react-router-dom";

const Navbar = ({ user, totalProduct }) => {
  const history = useHistory();

  const handlelogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };
  return (
    <div className="navbar">
      <div className="leftside">
        <Link className="navlink" to="/">
          <img src={logo} alt="img" />
        </Link>
      </div>
      <div className="rightside">
        {!user && (
          <>
            <Link to="/signup" className="navlink">
              SIGN UP
            </Link>
            <Link to="/login" className="navlink">
              LOGIN
            </Link>
          </>
        )}

        {user && (
          <>
            <div className="rightside">
              <Link className="navlink" to="/">
                {user}
              </Link>
              <div className="cart-menu-btn">
                <Link className="navlink" to="/cart">
                  <Icon icon={shoppingCart} size={20} />
                </Link>
                <span className="cart-indicator">{totalProduct}</span>
              </div>
              <div onClick={handlelogout}>
                <Link to="/logout" className="navlink">
                  {" "}
                  Logout{" "}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
