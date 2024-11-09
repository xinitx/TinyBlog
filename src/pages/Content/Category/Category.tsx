
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Summary} from "../../../api/articleService.tsx";
import './Category.less'
const Category : React.FC<{catalogData:Summary[]}> = ({catalogData= []})  => {
    const  [isAchieve,setIsAchieve] = useState(true)
    const  [data,setData] = useState<Summary[]>([])
    const  [dataList,setDataList] = useState<Summary[][]>([])
    useEffect(()=>{
        //console.log(catalogData)
        if(isAchieve){
            setData(catalogData.filter(item=>item.category.indexOf('归档')!== -1))
        }else {
            setData(catalogData.filter(item=>item.category.indexOf('归档')=== -1))
        }
    },[isAchieve, catalogData])
    useEffect(()=>{
        let buffer = new Map()
        data.forEach(item=>{
            let category = item.category[1]
            if(buffer.has(category)){
                buffer.set(category,[...buffer.get(category),item])
            }else {
                buffer.set(category,[item])
            }
        })
        //console.log([...buffer.values()])
        setDataList([...buffer.values()])
        //console.log(dataList)
    },[data])
    return (
        <div className={'app-category-line'}>
            <div key = {0} className={'app-category-header'} onClick={()=>setIsAchieve(!isAchieve)}>
                    {isAchieve ? '归档' : '施工'}
            </div>
            {dataList.map((item,index)=>{
                return(
                    <div key = {index + 1} className={'app-category-item'}>
                        <div className={'app-category-text app-category-text-close'} onClick={(e)=>{
                            e.stopPropagation()
                            if(e.currentTarget.classList.contains('app-category-text-close')) {
                                e.currentTarget.classList.remove('app-category-text-close')
                            }else {
                                e.currentTarget.classList.add('app-category-text-close')
                            }
                        }}>{item[0].category[1]}</div>
                        {item.map((category, i) => {
                        return(
                            <Link key={i} to={'/article/'+category.id} className={'app-category-link'}>
                                <div className={'app-category-date'}>{new Date(Number(category.id)).toLocaleDateString().slice(5)}</div>
                                <div className={'app-category-title'}>{category.title}</div>
                            </Link>
                        )})}
                    </div>
                )
            })}
        </div>
    )
}
export default Category