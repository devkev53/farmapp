import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Routes/App'
import './styles/reset.css'
import './styles/vars.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
