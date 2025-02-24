import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import store from './store';
import {Provider} from "react-redux";

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
              <Provider store={store}>
              <App />
              </Provider>
          </BrowserRouter>
      </Suspense>
  </StrictMode>,
)
