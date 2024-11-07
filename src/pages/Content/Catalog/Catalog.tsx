import {articles} from "../../../assets/data.ts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {IconAdd} from "../../../components/Icon/icons/iconAdd.tsx";
import "./Catalog.less"
interface article {
    id?: number;
    title: string;
    tag: string[];
    date: string;
    summary: string;
}
const Catalog: React.FC = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [catalogData, setCatalogData] = useState<article>({summary: "", date: "", id: 0, tag: [], title: ""});
    useEffect(() => {
        fetch('http://localhost:8088/api/md')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let buf: article = {
                    id: 1,
                    title: '',
                    tag: [],
                    date: '',
                    summary: ''
                }
                setData(data.markdown);
                const title = data.markdown.match(/title:(.*?)\n/)
                title ? buf.title = title[1] : buf.title = ''
                const tag = data.markdown.match(/tags:(.*?)\n/)
                tag ? buf.tag = tag[1].split(',') : buf.tag = []
                const createTime = data.markdown.match(/date:(.*?)\n/)
                createTime ? buf.date = createTime[1] : buf.date = ''
                console.log(data.markdown);
                setCatalogData(buf)
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className={`content`}>
            <div className={`article-add`}>
                <Link to={'/edit/0'}><IconAdd fill={'#fff'} width={'20px'} height={'20px'}></IconAdd></Link>
            </div>
            {articles.map(item => (
                <div key={item.id} className={`markdown-body`} style={{marginBottom: '20px'}}>
                    <Link to={'/article/:id'}>{catalogData.title  + catalogData.tag + catalogData.date}</Link>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                         {catalogData.summary}
                    </ReactMarkdown>
                </div>
            ))}
        </div>
    )
}

export default Catalog