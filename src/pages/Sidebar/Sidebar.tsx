import './Sidebar.less';
import Avatar from "../../components/Avatar/Avatar.tsx";
import viteLogo from "../../assets/react.svg";
import React, {useEffect, useState} from "react";
import {IconEmail} from "../../components/Icon/icons/iconEmail.tsx";
import {IconGitHub} from "../../components/Icon/icons/iconGitHub.tsx";
import {IconUp} from "../../components/Icon/icons/iconUp.tsx";
import TypingEffect from "../../components/ TypingEffect/ TypingEffect.tsx";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer.tsx";
import SliderScroll from "../../components/Slider/sliders/sliderScroll.tsx";

interface SidebarProps {
    getOpen?: (open: boolean) => void; //获取开关状态
    container?: HTMLElement; //侧边栏内容
    iconList?: HTMLElement[]; //按钮
}
const Sidebar: React.FC<SidebarProps> = ( sidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const SidebarRef = React.createRef<HTMLDivElement>();
    const ContainerRef = React.createRef<HTMLDivElement>();
    const toggleSidebar = () => {
        sidebarProps.getOpen && sidebarProps.getOpen(!isOpen);
        setIsOpen(!isOpen);
    };
    const handleResize = () => {
        if (ContainerRef.current) {
            // 临时禁用 transition
            ContainerRef.current.style.transition = "none";
            // 强制浏览器重新计算样式
            void ContainerRef.current.offsetWidth;
            // 恢复 transition
            ContainerRef.current.style.transition = "left 0.3s ease-in-out";
        }
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [ContainerRef]);
    return (
        <div className={`app-sidebar ${isOpen ? 'app-sidebar-open' : ''}`} ref={ContainerRef}>
            <div  className={`app-sidebar-container`} ref={SidebarRef}>
                  <Avatar className={'app-sidebar-avatar'} src={viteLogo} alt={'Avatar'} size={'medium'}/>
                  <div className={'app-sidebar-linklist'}>
                      <a href={'http://init33.top'} className={'icon-link'}  ><IconEmail></IconEmail>Email</a>
                      <a href={'http://init33.top'} className={'icon-link'}  ><IconGitHub></IconGitHub>GitHub</a>
                  </div>
                <div className={'app-sidebar-typing-text'}>
                   Have a&nbsp;
                    <TypingEffect
                        strings={["good", "nice", "happy", "wonderful"]}
                        typeSpeed={500}
                        backSpeed={500}
                        cursorChar='|'
                    />
                    &nbsp;day!
                </div>
                <MusicPlayer className={'app-sidebar-music'}/>

            </div>
            <div className={`${isOpen ? 'app-sidebar-toggle-open' : 'app-sidebar-toggle'}`} role="button" onClick={toggleSidebar}>
                <span className="app-toggle-line"></span>
                <span className="app-toggle-line"></span>
                <span className="app-toggle-line"></span>
            </div>
            <IconUp className="app-sidebar-top-button" ></IconUp>
            <SliderScroll parentRef={SidebarRef}/>
            <SliderScroll vertical={true} parentRef={SidebarRef}/>
        </div>
      );  
}
export default Sidebar;