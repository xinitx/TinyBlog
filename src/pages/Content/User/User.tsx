import {useEffect, useState} from "react";
import './User.less'
import IconInput from "../../../components/Icon/icons/iconInput.tsx";
import {login} from "../../../api/userService.tsx";
import {deleteArticle, Summary} from "../../../api/articleService.tsx";

const User: React.FC<{catalogData:Summary[], loginStatus:boolean, setLoginStatus: (status:boolean)=>void}> = ({catalogData=[], loginStatus, setLoginStatus}) => {
    const[password, setPassword] = useState('')
    const [isPressed, setIsPressed] = useState("");
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (isPressed) {
            const id = setInterval(() => {
                deleteArticle(isPressed).then(res=>{
                    if(res){
                        setIsPressed('')
                        const element=  document.getElementById(isPressed)
                        if(element){
                            element.classList.add('app-delete-table-row-delete')
                        }
                        console.log('删除成功');
                    }else{
                        console.log('删除失败');
                    }
                })
                //console.log('定时器触发', isPressed);
            }, 4000);
            setIntervalId(id);
        } else {
            if (intervalId) {
                //console.log('删除定时器');
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }

        // 清理定时器
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPressed]);
    return (
        <div style={{width: '100%'}}>
        <div className={'app-user'}>
            <input type={'password'} spellCheck="false" className={'app-user-input'} value={password}
                   onChange={e=>setPassword(e.target.value)}
                    onFocus={e=>e.target.classList.add('app-user-input-active')}
                        onBlur={e=>e.target.classList.remove('app-user-input-active')}
                   onKeyUp={e=>{
                       if(e.key === 'Enter'){
                           setPassword(e.currentTarget.value)
                           login(e.currentTarget.value).then(res=>setLoginStatus(res))
                       }}}
            />
            <IconInput onClick={async () => setLoginStatus(await login(password))} className={`app-user-button ${password === '' ? '' : 'app-user-button-active'}`} />
        </div>
        <div className={'app-delete-table'}>
            {loginStatus && catalogData.map(item => (
                <div key={item.id} id={item.id} className={'app-delete-table-row'}>
                    <div className={'app-delete-table-row-text'}>{item.title}</div>
                    <button className={'app-delete-table-row-button'}
                        onMouseDown={e=>{
                            e.currentTarget.classList.add('app-delete-table-row-button-animation');
                            setIsPressed(item.id)
                        }}
                        onMouseUp={e=>{
                            e.currentTarget.classList.remove('app-delete-table-row-button-animation')
                            setIsPressed('')
                        }}
                        onMouseLeave={e=>{
                            e.currentTarget.classList.remove('app-delete-table-row-button-animation')
                            setIsPressed('')
                        }}
                    >x
                        <div className={'app-delete-table-row-button-hidden-right'}>
                            <div className={'app-delete-table-row-button-progress-right'}>
                            </div>
                        </div>
                        <div className={'app-delete-table-row-button-hidden-left'}>
                            <div className={'app-delete-table-row-button-progress-left'}>
                            </div>
                        </div>
                    </button>

                </div>
            ))}
        </div>
        </div>
    )
}

export default User