

import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {IconAdd} from "../../../components/Icon/icons/iconAdd.tsx";
import "./Catalog.less"
import MDEditor from "@uiw/react-md-editor";
import Tag from "../../../components/Tag/Tag.tsx";
import {IconDate} from "../../../components/Icon/icons/iconDate.tsx";

interface Summary {
    id: string;
    title: string;
    tags: string[];
    date: string;
    summary: string;
}

const Catalog: React.FC = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [catalogData, setCatalogData] = useState<Summary[]>([]);
    useEffect(() => {
        fetch('http://localhost:8088/api/md/summaries')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                let res = []
                data.forEach(item=>{
                    res.push({
                        id: item.id,
                        title: item.title,
                        tags: item.tags,
                        date: item.date,
                        summary: item.summary
                    })
                })
                setCatalogData(res)
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className={`app-content`}>
            <div className={`app-article-add`}>
                <Link to={'/edit/0'}><IconAdd fill={'#fff'} width={'20px'} height={'20px'}></IconAdd></Link>
            </div>
            {catalogData.map(item => (

                <div key={item.id} className={`app-catalog`} style={{marginBottom: '20px'}}>
                    <div className={`app-catalog-header`}>
                        <Link className={`app-catalog-header-title`} to={'/article/'+item.id}><h2>{item.title}</h2></Link>
                        {item.tags.map(tag => (
                            <Link to={'/Tag/:value'}><Tag tag={tag}/></Link>
                        ))}
                    </div>
                    <Link to={'/TimeLine/:value'} className={`app-catalog-date`}><IconDate/>{(new Date(Number(item.date))).toLocaleDateString()}</Link>
                    <MDEditor.Markdown source={item.summary}  style={{backgroundColor: '#000', color: '#fff'}}/>
                </div>
            ))}
        </div>
    )
}

export default Catalog