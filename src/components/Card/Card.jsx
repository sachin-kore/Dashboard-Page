// src/Card.js
import React from 'react'
import './card.css' // Import custom CSS

const Card = ({ title, content, removeWidget, id, setShowPopup }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <button
            className="btn"
            style={{ position: 'absolute', top: '0px', right: '0px' }}
            onClick={() => removeWidget(id)}
          >
            X
          </button>
          <h3 className="card-title">{title}</h3>
          <p className="card-content">{content}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <button className="button" onClick={() => setShowPopup(true)}>
            <span>+</span>
            Add Widgets
          </button>
        </div>
      </div>
    </>
  )
}

export default Card
