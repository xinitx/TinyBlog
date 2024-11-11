import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import './Article.less'
import {Code} from "../../../components/MarkDown/Code.tsx"
import {getArticleById} from "../../../api/articleService.tsx";

const Article : React.FC<{setHeaders: (headers: any[]) => void}> = ({setHeaders}) => {

    const { id } = useParams();
    const [data, setData] = useState("");
    const getHeaders = (appContentRef: HTMLElement | null) => {
        if (appContentRef) {
            const headerElements = appContentRef.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const headersArray = Array.from(headerElements).map((header) => ({
                id: header.id,
                tag: header.nodeName,
                text: header.textContent || ''
            }));
            //console.log(headersArray);
            setHeaders(headersArray);
        }
    };
    useEffect(()=>{
        getHeaders(document.getElementById('app-content'));
    },[data])
    useEffect(() => {
        //console.log(id)
        if(id){
            getArticleById(id)
                .then(res => {
                    //console.log(res)
                   setData(res)
                })
                .catch(() => {
                    //console.error('There has been a problem with your fetch operation:', error);
                });
        }

    }, [id]);
    return(
            <div style={{marginBottom: '20px', width: '100%', height: '100%'}}>
                {/* @ts-ignore*/}
                <MDEditor.Markdown components={{code: Code}} source={data.slice(data.indexOf('---'))} className={`app-article`} style={{backgroundColor: '#1e293b', color: '#7d7d7d', }}/>
            </div>
    )
}
export default Article