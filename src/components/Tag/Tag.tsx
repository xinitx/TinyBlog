import "./Tag.less"
// 生成随机颜色的函数
const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
const Tag: React.FC<{ tag: string }> = ({ tag }) => {
    // 生成随机颜色
    const randomColor = getRandomColor();
    return (
        <div className={'app-tag'} style={{ backgroundColor: randomColor }}>
            {tag}
        </div>
    )
}
export default Tag