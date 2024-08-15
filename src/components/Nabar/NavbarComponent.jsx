// src/Navbar.js
import React from 'react'
import './navbar.css' // Import custom CSS

const NavbarComponent = ({ setShowPopup, setSearchTerm, searchTerm }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div href="#home" className="navbar-logo">
          <p className="logo">Dashboard</p>
        </div>

        <form className="navbar-search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Search"
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        <div className="navbar-buttons">
          <button onClick={() => setShowPopup(true)} className="btn btn-add">
            + Add Widget
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent
