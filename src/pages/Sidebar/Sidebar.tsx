import './Sidebar.less';
import React, {useEffect, useState} from "react";
import IconUp from "../../components/Icon/icons/iconUp.tsx";
import SliderScroll from "../../components/Slider/sliders/sliderScroll.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import IconSideBar from "../../components/Icon/icons/iconSideBar.tsx";
import IconReturn from "../../components/Icon/icons/iconReturn.tsx";

export interface SidebarProps {
    getStatus?: (open: boolean) => void; //获取开关状态
    getPath?: (path: string) => void; //统一获取当前路由
    iconList?: React.ReactNode[]; //自定义按钮
    children?: React.ReactNode; //侧边栏内容
    scrollToTopRef:  React.RefObject<HTMLDivElement>; //回到顶部
}
const Sidebar: React.FC<SidebarProps> = ( {getStatus,scrollToTopRef,getPath, children, iconList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollStatus,setScrollStatus ] = useState(false)
    const SidebarRef = React.createRef<HTMLDivElement>();
    const navigate = useNavigate();
    const location = useLocation();
    const scrollToTop = () => {
        scrollToTopRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const openSidebar = () => {
        getStatus && getStatus(!isOpen);
        setIsOpen(!isOpen);
    };
    const handleBack = () => {
        navigate(-1);
    };
    useEffect(()=>{
        if(getPath){
            getPath(location.pathname);
        }

    },[location])
    const scrollHandler = () => {
        if(scrollToTopRef.current?.scrollTop && scrollToTopRef.current?.scrollTop > 0){
            setScrollStatus(true)
        }else {
            setScrollStatus(false)
        }
    }
    useEffect(()=>{
        scrollToTopRef.current?.addEventListener('scroll',scrollHandler)
        return ()=>{
            scrollToTopRef.current?.removeEventListener('scroll',scrollHandler)
        }
    }, [scrollToTopRef])
    return (
        <div className={`app-sidebar ${isOpen ? 'app-sidebar-open' : ''}`}>
            <div  className={`app-sidebar-container`} ref={SidebarRef}>
                {children}
            </div>
            <div className={`app-sidebar-iconList`}>
                <div onClick={handleBack} className="app-sidebar-default-button app-sidebar-button-default-animation"><IconReturn></IconReturn></div>
                {iconList}
                <div onClick={openSidebar} className={`app-sidebar-default-button app-sidebar-button-default-animation app-sidebar-open-button ${isOpen?'app-sidebar-open-button-open':''}`}><IconSideBar ></IconSideBar></div>
                <div onClick={scrollToTop} className={`app-sidebar-default-button ${ scrollStatus ?'app-sidebar-top-button-show' :'app-sidebar-top-button'}`}><IconUp  ></IconUp></div>
            </div>
            <SliderScroll parentRef={SidebarRef}/>
            <SliderScroll vertical={true} parentRef={SidebarRef}/>
        </div>
      );  
}
export default Sidebar;