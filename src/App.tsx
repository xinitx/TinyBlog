
import Sidebar from './pages/Sidebar/Sidebar';
import Content from './pages/Content/Content';
import Footer from './pages/Footer/Footer';
import Header from './pages/Header/Header';
import './App.less'
import {useEffect, useRef, useState} from "react";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const appRef = useRef<HTMLDivElement>(null);
    const getSidebarOpen = (open: boolean) => {
        setSidebarOpen(open);
    };
    const handleResize = () => {
        if (appRef.current) {
            // 临时禁用 transition
            appRef.current.style.transition = "none";
            // 强制浏览器重新计算样式
            void appRef.current.offsetWidth;
            // 恢复 transition
            appRef.current.style.transition = "margin-left 0.3s ease-in-out";
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [appRef]);
    return (
    <div ref={appRef} className={`app ${sidebarOpen ? 'app-open' : ''}`}>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
        <Sidebar getOpen={getSidebarOpen}></Sidebar>
    </div>
  )
}

export default App
