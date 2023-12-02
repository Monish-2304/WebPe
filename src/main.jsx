import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Transactions from './Pages/Transactions.jsx'
import Data from './Pages/Data.jsx'
import Home from './Pages/Home.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"transactions",
        element:<Transactions/>,
      },
      {
        path:"data",
        element:<Data/>,
      },
    ]
  },
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
