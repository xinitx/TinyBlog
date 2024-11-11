import {useState} from "react";
import './User.less'
import {IconInput} from "../../../components/Icon/icons/iconInput.tsx";
import {login} from "../../../api/userService.tsx";
const User: React.FC = () => {
    const[password, setPassword] = useState('')
    return (
        <div className={'app-user'}>
            <input spellCheck="false" className={'app-user-input'} value={password}
                   onChange={e=>setPassword(e.target.value)}
                    onFocus={e=>e.target.classList.add('app-user-input-active')}
                        onBlur={e=>e.target.classList.remove('app-user-input-active')}
            />
            <IconInput onClick={() => login(password)} className={`app-user-button ${password === '' ? '' : 'app-user-button-active'}`} />
        </div>
    )
}

export default User