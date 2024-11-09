import './Alert.less';
import {useState} from "react"; // 引入样式文件

interface AlertProps {
    message: string;
    timer?: number;
}
const Alert: React.FC<AlertProps> = ({ message, timer=3000}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openAlert = () => {
        setIsOpen(true);
        // 设置 3 秒后自动关闭提示框
        setTimeout(() => {
            setIsOpen(false);
        }, timer);
    };
    return (
        isOpen ?
        <div className="alert-overlay">
            <div className="alert-content">
                <p>{message}</p>
            </div>
        </div> : <></>
    );
};

export default Alert;