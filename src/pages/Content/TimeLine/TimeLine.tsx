import {Summary} from "../../../api/articleService.tsx";
import './TimeLine.less'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import IconLeftArrow from "../../../components/Icon/icons/iconLeftArrow.tsx";
import IconRightArrow from "../../../components/Icon/icons/iconRightArrow.tsx";
const TimeLine: React.FC<{catalogData:Summary[]}> = ({catalogData= []}) => {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [timeLine, setTimeLine] = useState<Map<number,Summary[]>>(new Map())
    useEffect(()=>{
        let timeLineBuffer = new Map()
        catalogData.sort((a,b)=>Number(b.id)- Number(a.id)).forEach(item=>{
            let date = new Date(Number(item.id))
            let year = date.getFullYear()
            if(year && timeLineBuffer.has(year)){
                timeLineBuffer.set(year,[...timeLineBuffer.get(year)!,item])
            }else if(year){
                timeLineBuffer.set(year,[item])
            }
        })
        setTimeLine(timeLineBuffer)
        //console.log(timeLineBuffer)
    },[catalogData])
    return (
        <div className={'app-time-line'}>
            <div key = {0} className={'app-time-line-header-year'}>
                {currentYear}
                <div className={'app-time-line-header-year-button'}>
                <IconLeftArrow  onClick={()=>{setCurrentYear(currentYear+1)}}></IconLeftArrow>
                <IconRightArrow onClick={()=>{setCurrentYear(currentYear-1)}}></IconRightArrow>
                </div>
            </div>
            {timeLine.get(currentYear)?.map((item,index)=>{
                return(
                <div key = {index + 1} className={'app-time-line-header'}>
                    <Link to={'/article/'+item.id} className={'app-time-line-header-item'}>
                            <div className={'app-time-line-header-date'}>{new Date(Number(item.id)).toLocaleDateString().slice(5)}</div>
                            <div className={'app-time-line-header-title'}>{item.title}</div>
                    </Link>
                </div>)
            })}
        </div>
    )
}
export default TimeLine