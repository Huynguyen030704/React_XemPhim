import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const [show, setShow] = useState(false);

  const navBarVisibility = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarVisibility);

    return () => {
      window.removeEventListener("scroll", navBarVisibility);
    };
  }, []);

  // Khai báo click Show khi ấn vào Search
  //Khi Click vào Seach thì sẽ hiện page Search
  const seachHandler = () => {
    window.location.replace("/search");
  };

  return (
    <div className={`navBar ${show && "navBar-Black"}`}>
      <Link to="/" className="navBar-Logo">
        Movie App
      </Link>
      <FontAwesomeIcon
        className="navBar-Search"
        icon={faSearch}
        onClick={seachHandler}
      />
    </div>
  );
};

export default Navbar;
