import React from "react";
import {Link} from "react-router-dom";
import "./Catalog.less"
import MDEditor from "@uiw/react-md-editor";
import Tag from "../../../components/Tag/Tag.tsx";
import {IconDate} from "../../../components/Icon/icons/iconDate.tsx";
import {Code} from "../../../components/MarkDown/Code.tsx";
import {Summary} from "../../../api/articleService.tsx";



const Catalog: React.FC<{catalogData:Summary[]}> = ({catalogData = []}) => {
    return (
        <div style={{minWidth: '80%'}}>
            {catalogData.map(item => (
                <div key={item.id} className={`app-catalog`} style={{marginBottom: '20px'}}>
                    <div className={`app-catalog-header`}>
                        <Link className={`app-catalog-header-title`} to={'/article/'+item.id}><h2>{item.title}</h2></Link>
                        {item.tags.map(tag => (
                            <Link to={'/tags'} key={item.id+tag}><Tag tag={tag}/></Link>
                        ))}
                    </div>
                    <Link to={'/timeline'} className={`app-catalog-date`}><IconDate/>{(new Date(Number(item.id))).toLocaleDateString()}</Link>
                    {/* @ts-ignore*/}
                    <MDEditor.Markdown components={{code: Code}} source={item.summary} style={{backgroundColor: '#1e293b', color: '#7d7d7d'}} className={`app-catalog-summary`} />
                </div>
            ))}
        </div>
    )
}

export default Catalog