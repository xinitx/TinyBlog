import "./Header.less"
import {IconUser} from "../../components/Icon/icons/iconUser.tsx";
import {IconCategory} from "../../components/Icon/icons/iconCategory.tsx";
import {IconTag} from "../../components/Icon/icons/iconTag.tsx";
import {IconTimeLine} from "../../components/Icon/icons/iconTimeLine.tsx";
import {IconSearch} from "../../components/Icon/icons/iconSearch.tsx";
import {IconLine} from "../../components/Icon/icons/iconLine.tsx";
import {Link} from "react-router-dom";
const Header = ()=>{
    return (
        <div className="app-header">
            <Link to={'/'} className="app-title" style={{textDecoration: 'none'}}><IconLine className={'app-title-line'} viewBox={'0 0 180 1'}></IconLine>克己慎独，守心明性<IconLine className={'app-title-line'} style={{rotate: '180deg'}} viewBox={'0 0 180 1'}></IconLine></Link>
            <div className={'app-header-list'}>
                <Link to={'/login'}  style={{textDecoration: 'none'}}>
                    <div className={'icon-link'}><IconUser></IconUser>User</div>
                </Link>
                <Link to={'/tags'}  style={{textDecoration: 'none'}}>
                    <div className={'icon-link'}><IconTag></IconTag>Tags</div>
                </Link>
                <Link to={'/category'}  style={{textDecoration: 'none'}}>
                    <div className={'icon-link'}><IconCategory></IconCategory>Category</div>
                </Link>
                <Link to={'/timeline'}  style={{textDecoration: 'none'}}>
                    <div className={'icon-link'}><IconTimeLine></IconTimeLine>TimeLine</div>
                </Link>
                <Link to={'/search'} style={{textDecoration: 'none'}}>
                   <div className={'icon-link'}> <IconSearch></IconSearch>Search</div>
                </Link>
            </div>
        </div>
    )
}
export default Header;