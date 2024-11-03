import  "./Content.less";
import React from "react";
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css/github-markdown.css'
interface ContentProps {

}
const Content: React.FC<ContentProps> = () => {
    return (
        <div className={`content`}>
            <div className={`markdown-body`}>
            <ReactMarkdown >
                {`
                ### Hi there 👋
                I'm a software engineer with a passion for creating beautiful and functional websites. I have a strong background in web development and a commitment to delivering high-quality work.
                
                ### Skills
                - HTML5, CSS3, JavaScript
                - React, Vue, Angular
                - Node.js, Express
                - Git, GitHub
                - Responsive Design
                - Web Accessibility
                ### Skills
                - HTML5, CSS3, JavaScript
                - React, Vue, Angular
                - Node.js, Express
                - Git, GitHub
                - Responsive Design
                - Web Accessibility
                ### Skills
                - HTML5, CSS3, JavaScript
                - React, Vue, Angular
                - Node.js, Express
                - Git, GitHub
                - Responsive Design
                - Web Accessibility
                ### Projects`
                }
            </ReactMarkdown>
            </div>
        </div>
    );
}

export default Content