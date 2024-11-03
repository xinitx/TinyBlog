import "./Header.less"
import {IconUser} from "../../components/Icon/icons/iconUser.tsx";
import {IconCategory} from "../../components/Icon/icons/iconCategory.tsx";
import {IconTag} from "../../components/Icon/icons/iconTag.tsx";
import {IconTimeLine} from "../../components/Icon/icons/iconTimeLine.tsx";
import {IconSearch} from "../../components/Icon/icons/iconSearch.tsx";
import {IconLine} from "../../components/Icon/icons/iconLine.tsx";
const Header = ()=>{
    return (
        <div className="header">
            <a className="title"><IconLine className={'title-line'} viewBox={'0 0 180 1'}></IconLine>长风破浪会有时<IconLine className={'title-line'} viewBox={'0 0 180 1'}></IconLine></a>
            <div className={'header-list'}>
                <a href={'http://init33.top'} className={'icon-link'} ><IconUser></IconUser>User</a>
                <a href={'http://init33.top'} className={'icon-link'} ><IconTag></IconTag>Tag</a>
                <a href={'http://init33.top'} className={'icon-link'} ><IconCategory></IconCategory>Category</a>
                <a href={'http://init33.top'} className={'icon-link'} ><IconTimeLine></IconTimeLine>TimeLine</a>
                <a href={'http://init33.top'} className={'icon-link'} ><IconSearch></IconSearch>Search</a>
            </div>
        </div>
    )
}
export default Header;