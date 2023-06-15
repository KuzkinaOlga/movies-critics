/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { useUser } from "../../contexts/UserContext";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { user } = useUser();
  const userId = user?.id;
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setNav(!nav);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo">MOVIE</span>CRITICS
        </Link>

        <div className="burger-menu">
          <nav className={`menu-body ${nav ? "active-burger" : ""}`}>
            <ul className="menu-list">
              <li className="burger-menu_item">
                {user ? (
                  ""
                ) : (
                  <NavLink
                    to="/"
                    className="menu-link"
                    onClick={() => setNav(false)}
                  >
                    Login
                  </NavLink>
                )}
              </li>
              <li className="burger-menu_item">
                {user ? (
                  ""
                ) : (
                  <NavLink
                    to="/registration"
                    className="menu-link"
                    onClick={() => setNav(false)}
                  >
                    Registration
                  </NavLink>
                )}
              </li>
              <li>
                {user ? (
                  <NavLink
                    to="/blogs"
                    className="menu-link"
                    onClick={() => setNav(false)}
                  >
                    Blog
                  </NavLink>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </nav>
          <div
            onClick={() => setNav(!nav)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="menu-icon"
          >
            {nav ? (
              <MdClose size={40} className="burger-icon" />
            ) : (
              <CgMenuRight size={40} className="burger-icon" />
            )}
          </div>
        </div>
        <nav className="desktop-menu">
          {userId ? (
            <h3 className="desktop-menu_name">{user.name}</h3>
          ) : (
            <ul className="desktop-menu_list">
              <li className="desktop-menu_item">
                <NavLink to="/" className="desktop-menu_link">
                  Login
                </NavLink>
              </li>
              <li className="desktop-menu_item">
                <NavLink to="/registration" className="desktop-menu_link">
                  Registration
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
