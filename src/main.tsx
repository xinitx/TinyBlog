import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Suspense fallback={
          <div className="snake-spinner">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
      }>
          <BrowserRouter>
    <App /></BrowserRouter>
      </Suspense>
  </StrictMode>,
)
