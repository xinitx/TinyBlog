import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import App from './App.tsx'


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
    <App />
      </Suspense>
  </StrictMode>,
)
