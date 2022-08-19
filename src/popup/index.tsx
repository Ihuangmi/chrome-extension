import '../global.less'
import 'windi.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'

import Home from './home'
import Login from './login'


const Popup = () => {
  return (
    <HashRouter>
      <div className="w-362px h-524px">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Outlet />
      </div>
    </HashRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
)
