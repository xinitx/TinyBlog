
import IconInput from "../../../components/Icon/icons/iconInput.tsx";
import "./Search.less"
import {useState} from "react";
import {search} from "../../../api/searchService.tsx";
import {Summary} from "../../../api/articleService.tsx";
import TimeLine from "../TimeLine/TimeLine.tsx";
import IconReturn from "../../../components/Icon/icons/iconReturn.tsx";

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const [catalogData, setCatalogData] = useState<Summary[]>([])
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            {catalogData.length > 0 ?
                <><IconReturn onClick={()=>{setCatalogData([])}} style={{fill:'#fff', left: '30%', position: 'absolute', transform: `translateX(50%) translateY(-100%)`, cursor: 'pointer'}}></IconReturn>
                <TimeLine catalogData={catalogData}></TimeLine></> :
        <div className={'app-search'}>
            <input type={'text'} spellCheck="false" className={'app-search-input'} value={searchText}
                   onChange={e=>setSearchText(e.target.value)}
                   onFocus={e=>e.target.classList.add('app-search-input-active')}
                   onBlur={e=>e.target.classList.remove('app-search-input-active')}
                   onKeyUp={e=>{
                       if(e.key === 'Enter'){
                           setSearchText(e.currentTarget.value)
                           search(searchText).then((res)=>{
                               setCatalogData(res)
                           })
                       }}}
            >
            </input>
            <IconInput onClick={async () => setCatalogData(await search(searchText))}  className={`app-search-button ${searchText === '' ? '' : 'app-search-button-active'}`} />

        </div>
                }
        </div>
    )
}
export default Search
