import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const Article : React.FC = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8088/api/md/'+id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

            })
            .catch(error => {

            });
    }, [id]);
    return(
        <div className={`content`}>
            <div className={`markdown-body`} style={{marginBottom: '20px'}}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} >
                    {data}
                </ReactMarkdown>
            </div>
        </div>
    )
}
export default Article