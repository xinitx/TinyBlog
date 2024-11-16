
import ReactDOMServer from 'react-dom/server';
import App from './App';
import {StaticRouter} from "react-router-dom/server";
import {Suspense} from "react";



export function ServerEntry(url:string){
    return ReactDOMServer.renderToString(
        <StaticRouter location={url}>
            <Suspense fallback={
                <div className="snake-spinner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            }>
            <App/>
                </Suspense>
        </StaticRouter>)
}
