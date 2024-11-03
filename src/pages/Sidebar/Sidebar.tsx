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
    getOpen?: (open: boolean) => void;
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
            ContainerRef.current.style.transition = "margin-left 0.3s ease-in-out";
        }
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} ref={ContainerRef}>
            <div  className={`sidebar-container`} ref={SidebarRef}>
                  <Avatar className={'sidebar-avatar'} src={viteLogo} alt={'Avatar'} size={'medium'}/>
                  <div className={'sidebar-linklist'}>
                      <a href={'http://init33.top'} className={'icon-link'}  ><IconEmail></IconEmail>Email</a>
                      <a href={'http://init33.top'} className={'icon-link'}  ><IconGitHub></IconGitHub>GitHub</a>
                  </div>
                <div className={'typing-text'}>
                   Have a&nbsp;
                    <TypingEffect
                        strings={["good", "nice", "happy", "wonderful"]}
                        typeSpeed={500}
                        backSpeed={500}
                        cursorChar='|'
                    />
                    &nbsp;day!
                </div>
                <MusicPlayer className={'sidebar-music'}/>

            </div>
            <div className={`${isOpen ? 'sidebar-toggle-open' : 'sidebar-toggle'}`} role="button" onClick={toggleSidebar}>
                <span className="toggle-line"></span>
                <span className="toggle-line"></span>
                <span className="toggle-line"></span>
            </div>
            <IconUp className="sidebar-top-button" ></IconUp>
            <SliderScroll parentRef={SidebarRef}/>
            <SliderScroll vertical={true} parentRef={SidebarRef}/>
        </div>
      );  
}
export default Sidebar;