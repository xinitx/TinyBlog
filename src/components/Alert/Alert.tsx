import './Alert.less';


interface AlertProps {
    message: string;
    timer?: number;
}
const Alert: React.FC<AlertProps> = ({ message}) => {


    return (

        <div className="alert-overlay">
            <div className="alert-content">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Alert;