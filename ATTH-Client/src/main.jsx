import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import MyRoute from './MyRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyRoute />
  </StrictMode>,
)
