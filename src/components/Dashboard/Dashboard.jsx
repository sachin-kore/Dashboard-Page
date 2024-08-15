import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import './dashboard.css'
import Card from '../Card/Card'

const Dashboard = ({
  showPopup,
  handleClose,
  setShowPopup,
  data,
  setData,
  filteredWidgets,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    'cspm-executive-dashboard',
  )
  const [widgetName, setWidgetName] = useState('')
  const [widgetText, setWidgetText] = useState('')

  const addWidget = () => {
    if (widgetName && widgetText) {
      const newWidget = {
        id: uuidv4(),
        name: widgetName,
        text: widgetText,
        categories: [selectedCategory],
      }

      setData((prevData) => ({
        ...prevData,
        widgets: [...prevData.widgets, newWidget],
        categories: prevData.categories.map((cat) =>
          cat.id === selectedCategory
            ? { ...cat, widgets: [...cat.widgets, newWidget] }
            : cat,
        ),
      }))
      // localStorage.setItem('data', JSON.stringify(data))
      setWidgetName('')
      setWidgetText('')
      setShowPopup(false)
    }
  }

  const removeWidget = (widgetId) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((cat) =>
        cat.id === selectedCategory
          ? {
              ...cat,
              widgets: cat.widgets.filter((widget) => widget.id !== widgetId),
            }
          : cat,
      ),
      widgets: prevData.widgets.map((widget) =>
        widget.id === widgetId
          ? {
              ...widget,
              categories: widget.categories.filter(
                (catId) => catId !== selectedCategory,
              ),
            }
          : widget,
      ),
    }))
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col md={3}>
          <h3>Categories</h3>
          <ListGroup style={{ opacity: 0.999 }}>
            {data?.categories?.map((cat) => (
              <ListGroup.Item
                key={cat.id}
                active={cat.id === selectedCategory}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          <h3>Widgets</h3>
          <ListGroup>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {filteredWidgets
                .filter((widget) =>
                  widget.categories.includes(selectedCategory),
                )
                .map((widget) => (
                  <Card
                    title={widget.name}
                    content={widget.text}
                    key={widget.id}
                    removeWidget={removeWidget}
                    id={widget.id}
                    setShowPopup={setShowPopup}
                  />
                ))}
            </div>
          </ListGroup>

          {showPopup && (
            <div className="popUpParent">
              <div className="popupContainer" style={{ opacity: 999 }}>
                <div className="parent">
                  <h3 className="mt-4">Add Widget</h3>
                  <button className="btn" onClick={handleClose}>
                    X
                  </button>
                </div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Widget Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={widgetName}
                      onChange={(e) => setWidgetName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Widget Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={widgetText}
                      onChange={(e) => setWidgetText(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="btn" variant="primary" onClick={addWidget}>
                    Add Widget
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
