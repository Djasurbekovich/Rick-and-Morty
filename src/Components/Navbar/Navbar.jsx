import React from "react";
import Container from "../../Utils/Container/Container";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="nav">
      <Container>
        <div className="nav__wrap">
          <NavLink to='/' style={{textDecoration: 'none'}}>
            <strong className="nav__logo">The Rick and Morty</strong>
          </NavLink>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/location">Location</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/episode">Episode</NavLink>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
