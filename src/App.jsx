import React, { useState } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import NavbarComponent from './components/Nabar/NavbarComponent'
import './App.css'

const initialData = {
  categories: [
    {
      id: 'cspm-executive-dashboard',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'widget1',
          name: 'Widget 1',
          text: 'Random text for Widget 1',
        },
        {
          id: 'widget2',
          name: 'Widget 2',
          text: 'Random text for Widget 2',
        },
      ],
    },
    {
      id: 'network-operations',
      name: 'Network Operations',
      widgets: [],
    },
  ],
  widgets: [
    {
      id: 'widget1',
      name: 'Widget 1',
      text: 'Random text for Widget 1',
      categories: ['cspm-executive-dashboard'],
    },
    {
      id: 'widget2',
      name: 'Widget 2',
      text: 'Random text for Widget 2',
      categories: ['cspm-executive-dashboard'],
    },
    {
      id: 'widget3',
      name: 'Widget 3',
      text: 'Random text for Widget 3',
      categories: [],
    },
  ],
}
const App = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [data, setData] = useState(initialData)
  const handleClose = () => setShowPopup(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredWidgets = data.widgets.filter((widget) =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  return (
    <div className="app">
      <NavbarComponent
        setShowPopup={setShowPopup}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <Dashboard
        showPopup={showPopup}
        handleClose={handleClose}
        setShowPopup={setShowPopup}
        data={data}
        setData={setData}
        handleSearch={handleSearch}
        filteredWidgets={filteredWidgets}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
    </div>
  )
}

export default App
