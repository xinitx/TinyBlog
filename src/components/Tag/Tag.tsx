import "./Tag.less"
import React from "react";
// 生成随机颜色的函数
const getRandomColor = (): string => {
    const letters = '456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 12)];
    }
    //console.log(color);
    return color;
};
const Tag: React.FC<{ tag: string,style?: React.CSSProperties,click?:(e:any)=>void }> = ({ tag, style, click }) => {
    // 生成随机颜色
    const randomColor = getRandomColor();
    return (
        <div className={'app-tag'} style={{...style, backgroundColor: randomColor}} onClick={click}>
            {tag}
        </div>
    )
}
export default React.memo(Tag)
