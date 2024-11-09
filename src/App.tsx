import './App.less'
import './pages/Sidebar/Sidebar.less';
import Footer from './pages/Footer/Footer';
import Header from './pages/Header/Header';
import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Catalog from "./pages/Content/Catalog/Catalog.tsx";
import User from "./pages/Content/User/User.tsx";
import Edit from "./pages/Content/Edit/Edit.tsx";
import Article from "./pages/Content/Article/Article.tsx";

import SliderScroll from "./components/Slider/sliders/sliderScroll.tsx";
import {getSongs, Song} from "./api/musicService.tsx";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.tsx";
import Avatar from "./components/Avatar/Avatar.tsx";
import {IconEmail} from "./components/Icon/icons/iconEmail.tsx";
import {IconGitHub} from "./components/Icon/icons/iconGitHub.tsx";
import TypingEffect from "./components/TypingEffect/TypingEffect.tsx";
import Sidebar from "./pages/Sidebar/Sidebar.tsx";
import {IconEdit} from "./components/Icon/icons/iconEdit.tsx";
import {IconAdd} from "./components/Icon/icons/iconAdd.tsx";
import Category from "./pages/Content/Category/Category.tsx";
import TimeLine from "./pages/Content/TimeLine/TimeLine.tsx";
import Search from "./pages/Content/Search/Search.tsx";
import Tags from "./pages/Content/Tags/Tags.tsx";
import {getSummaries, Summary} from "./api/articleService.tsx";

const AddArticle: React.FC = () => (
    <Link to={'/edit/0'}>
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [historyPath, setHistoryPath] = useState('');
    const [currentPath, setCurrentPath] = useState(window.location.href);
    const [songs, setSongs] = React.useState<Song[]>([]);
    const [headers, setHeaders] = useState<HeaderNode[]>([]);
    const [iconList, setIconList] = useState<React.ReactNode[]>([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);

    useEffect(()=>{

        getSongs().then(res=>{
            setSongs(res);
        }).catch(error => {
            console.error(error);
        });
        getSummaries().then(res=>{
            setSummaries(res)
        }).catch(error => {
            console.error(error);
        })
    },[])

    const EditArticle: React.FC = () => (

        <Link to={'/edit/'+currentPath.split('/article/')[1]}>
            <div className={`app-sidebar-default-button app-sidebar-button-default-animation`}>
                <IconEdit fill={'#fff'} width={'20px'} height={'20px'}>
                </IconEdit>
            </div>
        </Link>

    )

    function buildNestedList(flatData: HeaderNode[], level = 1): React.ReactNode[] {
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
        if(historyPath.startsWith('/article') || currentPath.startsWith('/article')){

        }
        setHistoryPath(currentPath);
        if(currentPath.startsWith('/article')){
            setIconList([<AddArticle key={1}/>, <EditArticle key={2}/>]);
        }
        if((historyPath || historyPath.startsWith('/article') ) && !currentPath.startsWith('/article')){
            setIconList([<AddArticle key={1}/>]);
        }
    }, [currentPath]);
    // 功能组件
    return (
    <div ref={appRef} className={`app ${sidebarOpen ? 'app-open-sidebar' : ''}`}>
        <Router>
        <Header></Header>
        <div id={'app-content'}>

            <Routes>
                <Route path="/" element={<Catalog  catalogData={summaries} />} />
                <Route path="/login" element={<User />} />
                <Route path="/tags" element={<Tags catalogData={summaries} />} />
                <Route path="/category" element={<Category catalogData={summaries}  />} />
                <Route path="/timeline" element={<TimeLine catalogData={summaries} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/article/:id" element={<Article setHeaders={setHeaders} />} />
            </Routes>
                <Sidebar getPath={setCurrentPath} scrollToTopRef={appRef} getStatus={setSidebarOpen} iconList={iconList}>
                    {currentPath.startsWith('/article') ?
                    (<div style={{margin: '30px'}}>
                        <div className={'app-sidebar-catalog-title'}>目录</div>
                        <ul className={'app-sidebar-catalog-nav'}>
                            {buildNestedList(headers)}
                        </ul>
                    </div>)
                        :
                    (<div style={{display: 'flex', flexDirection: 'column'}} >
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
                    </div>)}
                    <MusicPlayer songs={songs} className={`app-sidebar-music ${currentPath.startsWith('/article')? ' ': ' '}`}/>
                </Sidebar>

        </div>
        </Router>
        <Footer></Footer>
        <SliderScroll vertical={true} parentRef={appRef}/>
    </div>
  )
}

export default App
