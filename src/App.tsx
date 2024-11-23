import React, {lazy, useEffect, useRef, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import './App.less'
import './pages/Sidebar/Sidebar.less';
import Footer from './pages/Footer/Footer';
import Header from './pages/Header/Header';
import Catalog from "./pages/Content/Catalog/Catalog.tsx";
import Sidebar, {SidebarItem} from "./pages/Sidebar/Sidebar.tsx";

import {getSummaries, Summary} from "./api/articleService.tsx";
import {getSongs, Song} from "./api/musicService.tsx";
import IconAdd from "./components/Icon/icons/iconAdd.tsx";
import IconEdit from "./components/Icon/icons/iconEdit.tsx";
import Avatar from "./components/Avatar/Avatar.tsx";
import IconEmail from "./components/Icon/icons/iconEmail.tsx";
import IconGitHub from "./components/Icon/icons/iconGitHub.tsx";
import TypingEffect from "./components/TypingEffect/TypingEffect.tsx";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.tsx";
import User from "./pages/Content/User/User.tsx";
import Tags from "./pages/Content/Tags/Tags.tsx";
import Category from "./pages/Content/Category/Category.tsx";
import TimeLine from "./pages/Content/TimeLine/TimeLine.tsx";
import Search from "./pages/Content/Search/Search.tsx";
import SliderScroll from "./components/Slider/sliders/sliderScroll.tsx";
const Article = lazy(()=>import('./pages/Content/Article/Article.tsx'))
const Edit = lazy(()=>import('./pages/Content/Edit/Edit.tsx'))

const AddArticle: React.FC = () => (
    <Link to={'/edit/0'} title={'添加文章'}>
        <div className={`app-sidebar-default-button app-sidebar-button-default-animation`}>
            <IconAdd fill={'#fff'} width={'20px'} height={'20px'}></IconAdd>
        </div>
    </Link>
)

interface HeaderNode{
    id: string;
    text: string;
    tag:string
}
function App() {
    const appRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const [historyPath, setHistoryPath] = useState('');
    const [songs, setSongs] = React.useState<Song[]>([]);
    const [headers, setHeaders] = useState<HeaderNode[]>([]);
    const [iconList, setIconList] = useState<React.ReactNode[]>([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loginStatus, setLoginStatus] = useState(false);
    const  location = useLocation();
    useEffect(()=>{
        getSongs().then(res=>{
            setSongs(res);
        }).catch(() => {
            //console.error(error);
        });
        getSummaries().then(res=>{
            setSummaries(res)
        }).catch(() => {
            //console.error(error);
        })
    },[])

    const EditArticle: React.FC = () => (

        <Link to={'/edit/'+location.pathname.split('/article/')[1]} title={'编辑文章'}>
            <div className={`app-sidebar-default-button app-sidebar-button-default-animation`}>
                <IconEdit fill={'#fff'} width={'20px'} height={'20px'}>
                </IconEdit>
            </div>
        </Link>

    )
    function buildNestedList(flatData: HeaderNode[], level = 1): JSX.Element | null {
        let result: React.ReactNode[] = [];
        let currentLevel = level;

        for (let i = 0; i < flatData.length; i++) {
            const node = flatData[i];

            if (Number(node.tag[1]) === currentLevel) {
                //console.log(level+' '+i)

                result.push(
                    (<li className={`${Number(node.tag[1]) === 1  ? 'app-sidebar-catalog-common ' : 'app-sidebar-catalog-close '}`} key={level+'-'+i}>
                        <a href={`#${node.id}`} onClick={(e) => {
                            if(e.currentTarget.classList.contains('app-sidebar-catalog-open')) {
                                e.currentTarget.classList.remove('app-sidebar-catalog-open')
                            }else {
                                e.currentTarget.classList.add('app-sidebar-catalog-open')
                            }
                        }}>{node.text}</a>
                        {buildNestedList(flatData.slice(i + 1), Number(node.tag[1]) + 1)}
                    </li>)
                );
            } else if (Number(node.tag[1]) < currentLevel) {
                break;
            }
        }
        return (result.length > 0 ? <ul>{result}</ul> : null);
    }
    useEffect(() => {
        //切换侧边栏
        if(historyPath.startsWith('/article') || location.pathname.startsWith('/article')){

        }
        setHistoryPath(location.pathname);
        if(location.pathname.startsWith('/article')){
            setIconList([<AddArticle key={1}/>, <EditArticle key={2}/>]);


        }
        if((historyPath || historyPath.startsWith('/article') ) && !location.pathname.startsWith('/article')){
            setIconList([<AddArticle key={1}/>]);
        }
    }, [location.pathname]);
    const siderBarContent : SidebarItem[] = [
        {
            title: '目录',
            content: (<div>
                            <ul className={'app-sidebar-catalog-nav'}>
                                {buildNestedList(headers)}
                            </ul>
                        </div>),
            condition: () => {return location.pathname.startsWith('/article')}
        },
        {
            title: '主页',
            content: (<div style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
                            <Avatar className={'app-sidebar-avatar'} src={'/avatar.webp'} alt={'Avatar'} size={'medium'}/>
                            <div className={'app-sidebar-linklist'}>
                                <a href={'mailto://x17152141010@163.com'} className={'icon-link'}  ><IconEmail></IconEmail>Email</a>
                                <a href={'https://github.com/xinitx'} className={'icon-link'}  ><IconGitHub></IconGitHub>GitHub</a>
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
                            <MusicPlayer songs={songs} className={`app-sidebar-music`}/>
                            <User loginStatus={loginStatus} setLoginStatus={setLoginStatus} catalogData={summaries}/>
                        </div>),
            condition: () => {return true}
        }
    ]
    // 功能组件
    return (
    <div  className={`app`}>
        <Sidebar scrollToTopRef={appRef} iconList={iconList}>
            {siderBarContent}
        </Sidebar>
        <div ref={appRef}  className={'app-main'}>
            <Header></Header>
            <div id={'app-content'}>
                <Routes>
                    <Route path="/" element={<Catalog  catalogData={summaries} />} />
                    {/*<Route path="/login" element={<User loginStatus={loginStatus} setLoginStatus={setLoginStatus} catalogData={summaries} /> } />*/}
                    <Route path="/tags" element={<Tags catalogData={summaries} />} />
                    <Route path="/category" element={<Category catalogData={summaries}  /> } />
                    <Route path="/timeline" element={<TimeLine catalogData={summaries} /> } />
                    <Route path="/search" element={<Search /> } />
                    <Route path="/edit/:id" element={<Edit /> } />
                    <Route path="/article/:id" element={<Article setHeaders={setHeaders} />}/>
                </Routes>
            </div>
            <Footer ref={footerRef}></Footer>
        </div>
        <SliderScroll vertical={true} parentRef={appRef}/>
    </div>
  )
}

export default App
