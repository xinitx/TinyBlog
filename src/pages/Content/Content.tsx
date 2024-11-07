import  "./Content.less";
import React from "react";
import 'github-markdown-css/github-markdown-dark.css'
import 'react-quill/dist/quill.snow.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from "./Edit/Edit.tsx";
import User from "./User/User.tsx";
import Tag from "./Tag/Tag.tsx";
import Catalog from "./Catalog/Catalog.tsx";
import Article from "./Article/Article.tsx";

interface ContentProps {

}
const Content: React.FC<ContentProps> = () => {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/about" element={<User />} />
                <Route path="/contact" element={<Tag />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/article/:id" element={<Article />} />
            </Routes>
        </Router>

    );
}

export default Content