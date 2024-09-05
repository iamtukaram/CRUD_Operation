import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    <ToastContainer/>
   </StrictMode>,
)
