import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {IconUp} from "../../../components/Icon/icons/iconUp.tsx";


const Article : React.FC = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        console.log(id)
        fetch('http://localhost:8088/api/md/'+id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data.markdown)
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, [id]);
    return(
        <div className={`app-content`}>
            <IconUp className="app-sidebar-top-button" ></IconUp>
            <div className={`markdown-body`} style={{marginBottom: '20px'}}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} >
                    {data}
                </ReactMarkdown>
            </div>
        </div>
    )
}
export default Article