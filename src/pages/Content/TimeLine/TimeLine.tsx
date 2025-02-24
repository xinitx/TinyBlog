import {Summary} from "../../../api/articleService.tsx";
import './TimeLine.less'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import IconLeftArrow from "../../../components/Icon/icons/iconLeftArrow.tsx";
import IconRightArrow from "../../../components/Icon/icons/iconRightArrow.tsx";
const TimeLine: React.FC<{catalogData:Summary[]}> = ({catalogData= []}) => {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [timeLine, setTimeLine] = useState<Map<number,Summary[]>>(new Map())
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(()=>{
        let timeLineBuffer = new Map()
        catalogData.sort((a,b)=>Number(b.id)- Number(a.id)).forEach(item=>{
            let date = new Date(Number(item.id))
            let year = date.getFullYear()
            if(year && timeLineBuffer.has(year)){
                timeLineBuffer.set(year,[...timeLineBuffer.get(year)!,item])
            }else if(year){
                //console.log(year)
                timeLineBuffer.set(year,[item])
            }
        })
        //console.log(Math.max(...timeLineBuffer.keys()))
        setCurrentYear(Math.max(...timeLineBuffer.keys()))
        setTimeLine(timeLineBuffer)
        if (timeLineBuffer.size > 0){
            setIsLoading(false)
        }
        //console.log(timeLineBuffer)
    },[catalogData])
    return (
        <div className={'app-time-line'}>
            {!isLoading && <div>
            <div key = {0} className={'app-time-line-header-year'}>
                {currentYear}
                <div className={'app-time-line-header-year-button'}>
                    {currentYear < Math.max(...timeLine.keys()) ? <IconLeftArrow  onClick={()=>{ setCurrentYear(currentYear+1)}}></IconLeftArrow> : <div style={{width:"24px", height:"24px"}}></div>}
                    {currentYear > Math.min(...timeLine.keys()) ? <IconRightArrow onClick={()=>{ setCurrentYear(currentYear-1)}}></IconRightArrow>:  <div style={{width:"24px", height:"24px"}}></div>}
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
            </div>}
        </div>
    )
}
export default TimeLine
