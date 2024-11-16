import ReactDOM from 'react-dom/client';
import App from './App';
import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <BrowserRouter>
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
    </BrowserRouter>,
);

