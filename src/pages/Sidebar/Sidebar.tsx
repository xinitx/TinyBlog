import './Sidebar.less';
import Avatar from "../../components/Avatar/Avatar.tsx";
import viteLogo from "../../assets/react.svg";
import React, {useState} from "react";
import {IconEmail} from "../../components/Icon/icons/iconEmail.tsx";
import {IconGitHub} from "../../components/Icon/icons/iconGitHub.tsx";
import {IconUp} from "../../components/Icon/icons/iconUp.tsx";
import TypingEffect from "../../components/ TypingEffect/ TypingEffect.tsx";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer.tsx";

interface SidebarProps {

}
const Sidebar: React.FC<SidebarProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div  className={`sidebar-container`} >
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
        </div>
      );  
}
export default Sidebar;