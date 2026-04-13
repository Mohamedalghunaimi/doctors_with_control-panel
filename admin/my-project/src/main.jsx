import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import Provider from './pages/Provider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider>
      
      <App />
    </Provider>
      
    </BrowserRouter>
    
  </StrictMode>,
)
