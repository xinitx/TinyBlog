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
const Tag: React.FC<{ tag: string,style?: React.CSSProperties }> = ({ tag, style }) => {
    // 生成随机颜色
    const randomColor = getRandomColor();
    return (
        <div className={'app-tag'} style={{...style, backgroundColor: randomColor}}>
            {tag}
        </div>
    )
}
export default React.memo(Tag)