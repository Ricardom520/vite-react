import 'react-app-polyfill/stable'
import 'react-app-polyfill/ie9'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, useRoutes} from 'react-router-dom'
import Home from '~@/pages/home'

import './index.less'

const routes = [
  {
    path: '/',
    name: '主页',
    element: <Home />
  }
]

const Router = () => {
  const elm = useRoutes(routes)

  return elm
}

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </React.StrictMode>
)
