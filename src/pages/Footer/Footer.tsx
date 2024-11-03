import "./Footer.less"
import {IconCopyRight} from "../../components/Icon/icons/iconCopyRight.tsx";
import {IconHeart} from "../../components/Icon/icons/iconHeart.tsx";
const Footer = ()=>{
    return(
        <div className="footer">
            <a href="https://beian.miit.gov.cn/" target="_blank" className={"icon-link"}>
                <span style={{color:"#fff"}}>滇ICP备2023001289号-1</span>
                <img alt={"img"} src="/Police_Badge_of_China.svg" width={'20px'}></img>
            </a>
            <div style={{display:"flex",alignItems:"center", height:"36px"}}>
                <IconCopyRight fill="#1677FF" width={'24px'} height={'24px'}></IconCopyRight>
                <span style={{color:"#fff"}}>init</span>
                <IconHeart className={"footer-heart"}></IconHeart>
            </div>
        </div>
    )
}
export default Footer;