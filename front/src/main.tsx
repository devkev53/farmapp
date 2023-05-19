import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Routes/App'
import './styles/reset.css'
import './styles/vars.css'
import './styles/index.css'

import { SnackbarProvider } from 'notistack'
import { SnackbarUtilitiesConfigurator } from './utilities/snackbar-manager'
import { PrivateInterceptor, PublicInterceptor } from './interceptors'

PublicInterceptor()
PrivateInterceptor()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <SnackbarProvider>
    <SnackbarUtilitiesConfigurator />
      <App />
  </SnackbarProvider>
  // </React.StrictMode>,
)
