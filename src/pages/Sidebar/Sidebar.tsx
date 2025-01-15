import './Sidebar.less';
import React, {useEffect, useState} from "react";
import IconUp from "../../components/Icon/icons/iconUp.tsx";
import SliderScroll from "../../components/Slider/sliders/sliderScroll.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import IconSideBar from "../../components/Icon/icons/iconSideBar.tsx";
import IconReturn from "../../components/Icon/icons/iconReturn.tsx";

export interface SidebarItem {
    title: string;
    content: React.ReactNode;
    condition: ()=> boolean;
}
export interface SidebarProps {
    iconList?: React.ReactNode[]; //自定义按钮
    children?: SidebarItem[]; //侧边栏内容
    scrollToTopRef?:  React.RefObject<HTMLDivElement>; //回到顶部
}
const Sidebar: React.FC<SidebarProps> = ( {scrollToTopRef, children, iconList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollStatus,setScrollStatus ] = useState(false)
    const SidebarRef = React.createRef<HTMLDivElement>();
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const scrollToTop = () => {
        if(scrollToTopRef && scrollToTopRef.current){
            scrollToTopRef.current.scrollTop = 0
        }
    };
    const openSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleBack = () => {
        navigate(-1);
    };

    const scrollHandler = () => {
        if(scrollToTopRef?.current?.scrollTop && scrollToTopRef.current?.scrollTop > 0){
            setScrollStatus(true)
        }else {
            setScrollStatus(false)
        }
    }
    useEffect(()=>{
        scrollToTopRef?.current?.addEventListener('scroll',scrollHandler)
        return ()=>{
            scrollToTopRef?.current?.removeEventListener('scroll',scrollHandler)
        }
    }, [scrollToTopRef])
    return (
        <div className={`app-sidebar`}  >
            <div  className={`app-sidebar-container`} style={isOpen?{width:'20vw'}:{width:'0',opacity:'0'}}  ref={SidebarRef}>
                <div  className={`app-sidebar-container-title`}>
                    {children?.map((item,index)=>{
                        if(item.condition()){
                            return (
                                <div key={index} onClick={()=>setCurrentPage(index)}>
                                    {item.title}
                                </div>
                            )
                        }
                    })}
                </div>
                {children ? ( children[currentPage].condition() ?
                        children[currentPage].content
                            : (children.filter(item=>item.condition()).length > 0 ? children.filter(item=>item.condition())[0].content : null)
                    )
                    : null
                }
            </div>
            <div className={`app-sidebar-iconList`}>
                { location.state !== null || window.history.length > 1 ? <div onClick={handleBack} className="app-sidebar-default-button app-sidebar-button-default-animation"><IconReturn></IconReturn></div> : null}
                {iconList}
                <div onClick={openSidebar} className={`app-sidebar-default-button app-sidebar-button-default-animation app-sidebar-open-button ${isOpen?'app-sidebar-open-button-open':''}`}><IconSideBar ></IconSideBar></div>
                <div onClick={scrollToTop} className={`app-sidebar-default-button ${ scrollStatus ?'app-sidebar-top-button-show' :'app-sidebar-top-button'}`}><IconUp  ></IconUp></div>
            </div>
            <SliderScroll style={isOpen?{}:{display:'none'}} parentRef={SidebarRef}/>
            <SliderScroll style={isOpen?{}:{display:'none'}} vertical={true} parentRef={SidebarRef}/>
        </div>
      );  
}
export default Sidebar;