import  "./Content.less";
import React from "react";

interface ContentProps {

}
const Content: React.FC<ContentProps> = () => {
    return (
        <div className={`content`}>
            <p>666</p>
        </div>
    );
}

export default Content