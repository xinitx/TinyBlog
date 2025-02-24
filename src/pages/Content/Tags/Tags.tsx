import {Summary} from "../../../api/articleService.tsx";
import {useEffect, useState} from "react";
import Tag from "../../../components/Tag/Tag.tsx";
import './Tags.less'
import TimeLine from "../TimeLine/TimeLine.tsx";
import IconReturn from "../../../components/Icon/icons/iconReturn.tsx";
interface TagStyle {
    text: string;
    weight: number; // 权重，用于调整字体大小和颜色
}
const Tags : React.FC<{catalogData:Summary[]}> = ({catalogData= []}) =>{
    const [tags1, setTags1] = useState<TagStyle[][]>([]);
    const [tags2, setTags2] = useState<TagStyle[][]>([]);
    const [clickItemText, setClickItemText] = useState<string>("");
    useEffect(()=>{
        let buf:Record<string, number> = {}
        catalogData.map(item=> item.tags).flat().map(tag=>tag ? tag : '其他').forEach(tag=>{
            if(buf[tag]){
                buf[tag]++
            }else{
                buf[tag] = 1
            }
        });
        let buffer1: TagStyle[] = []
        let buffer2: TagStyle[] = []
        const buffer3: TagStyle[][] = []
        const buffer4: TagStyle[][] = []
        let count = 0;
        let level = 0.25; //层数
        let sum = 0
        let source = Object.keys(buf).map(text => ({
            text,
            weight: getFontSize(buf[text]) * getStrLeng(text)
        })).sort((a, b) => b.weight - a.weight)

        source.forEach(item => sum += item.weight)
        //console.log(source)
        for(let i = 0; i < source.length;){
            while (buffer1.length == 0 || (count <= sum * level && i < source.length)){
                count += source[i].weight
                buffer1.push(source[i++])
            }
            count = 0
            while (buffer1.length == 0 || (count <= sum * level && i < source.length)){
                count += source[i].weight
                buffer2.push(source[i++])
            }
            //console.log(i)
            //console.log(buffer1,buffer2)
            buffer3.push(buffer1)
            buffer1=[]
            buffer4.push(buffer2)
            buffer2=[]
            level *= 0.5
            count = 0
            //console.log("计数：",count,"目标",sum * level)
        }
        //console.log(buffer3,buffer4)
        setTags1(buffer3)
        setTags2(buffer4.reverse())
        return ()=>{
            setTimeout(()=>{

            },2000)
            console.log("Tags组件销毁")
        }
    }, [catalogData])
    const minWeight = Math.min(...tags1.flat().map(tag => tag.weight),...tags2.flat().map(tag => tag.weight),0);
    const maxWeight = Math.max(...tags1.flat().map(tag => tag.weight),...tags2.flat().map(tag => tag.weight),0);

    const getFontSize = (weight: number) => {
        const minFontSize = 14; // 最小字体大小
        const maxFontSize = 36; // 最大字体大小
        return Math.min(maxFontSize, Math.max(minFontSize, weight * 2 + minFontSize));
    };
    function getStrLeng(str:string){
        var realLength=0;
        var len=str.length;
        var charCode=-1;
        for(var i=0;i<len;i++){
            charCode=str.charCodeAt(i);
            if(charCode>=0&&charCode<=128){
                realLength += 1;
            }
            else{
                // 如果是中文则长度加2
                realLength += 2;
            }
        }
        return realLength;
    }
    const getColor = (weight: number) => {
        const minColor = 0; // 最小颜色值（HSL中的亮度）
        const maxColor = 40; // 最大颜色值（HSL中的亮度）
        const colorValue = minColor + ((maxColor - minColor) * (weight - minWeight)) / (maxWeight - minWeight);
        return `hsl(200, 80%, ${colorValue}%)`;
    };
    const getRotate = () => {
        const minDeg = -30; // 最小角度
        const maxDeg = 30; // 最大角度
        const degValue = Math.random() * (maxDeg - minDeg) + minDeg;
        return `${degValue}deg`;
    };
    return(
        clickItemText === "" ?
        <div className={'app-tags-col'}>
            {tags2.map((tags, row )=>{
                return (<div className={'app-tags-row'} key={'row'+(row +  1)}>{tags.map((tag, col)=>{
                    //console.log((row +  1) +'-'+ (col + 1))
                    return <Tag click={()=>{setClickItemText(tag.text)}} tag={tag.text} key={(row +  1) +'-'+ (col + 1)} style={{fontSize: (tag.weight/getStrLeng(tag.text))+'px', color: getColor(tag.weight),rotate:getRotate()}}></Tag>
                })}</div>)
            })}
            {tags1.map((tags, row )=>{
                return (<div className={'app-tags-row'} key={'row'+(row +  1 + tags2.length)}>{tags.map((tag, col)=>{
                    //console.log((row +  1 + tags2.length) +'-'+ (col + 1))
                    return <Tag click={()=>{setClickItemText(tag.text)}} tag={tag.text} key={(row +  1 + tags2.length) +'-'+ (col + 1)} style={{fontSize: (tag.weight/getStrLeng(tag.text))+'px', color: getColor(tag.weight),rotate:getRotate()}}></Tag>
                })}</div>)
            })}
        </div> : <><IconReturn onClick={()=>{setClickItemText("")}} style={{fill:'#fff', left: '30%', position: 'absolute', transform: `translateX(50%) translateY(-100%)`, cursor: 'pointer'}}></IconReturn>
            <TimeLine catalogData={catalogData.filter(item=>item.tags.includes(clickItemText))}></TimeLine>
            </>
    )
}

export default Tags
