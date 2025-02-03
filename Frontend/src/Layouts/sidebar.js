import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBars,
  FaPowerOff,
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
} from "react-icons/fa";
import "./Sidebar.css";
import { MdCategory } from "react-icons/md";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaBars /> : <FaBars />}
      </div>

      <ul>
        <li>
          <Link to="/">
            <FaTachometerAlt className="icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <MdCategory className="icon" />
            {isOpen && <span>Categories</span>}
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FaBoxOpen className="icon" />
            {isOpen && <span>Products</span>}
          </Link>
        </li>
        <li>
          <Link to="/customers">
            <FaUser className="icon" />
            {isOpen && <span>Customers</span>}
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <FaShoppingCart className="icon" />
            {isOpen && <span>Orders</span>}
          </Link>
        </li>
        
        <li>
          <Link to="#">
            <FaPowerOff className="icon" />
            {isOpen && <span>Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
