import "./Slider.less"
import {useRef} from "react";
interface SliderProps {
    func?: (value: number)=>void,
    relativeRef?: React.RefObject<HTMLElement>,
    holderClass?: string,
    barClass?: string,
    progressClass?: string,
    vertical?: boolean,
    progress?: number
}

const Slider: React.FC<SliderProps> = (props)=>{
    const {  vertical= false, func, progress = 0} = props
    const sliderRef  = useRef<HTMLDivElement>(null);
    const sliderHolderRef  = useRef<HTMLDivElement>(null);
    const toggleSlider = (e: React.MouseEvent) => {
        if(sliderRef.current){
            const rect = sliderRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left; // 相对于 div 的 x 坐标
            const y = -(e.clientY - rect.bottom);  // 相对于 div 的 y 坐标
            //console.log(x,y)
            const percentage = Math.min(Math.max(0, (vertical ? y : x) * 100 / (vertical ? sliderRef.current.offsetHeight: sliderRef.current.offsetWidth)), 90);
            if(func){
                func(percentage)
            }

        }
    };
    const startDragging = (e: React.MouseEvent) => {
            const startX = e.clientX;
            const startY = e.clientY;
            const handleMouseMove = (moveEvent: MouseEvent) => {
                if(sliderRef.current){
                    const x = moveEvent.clientX - startX;
                    const y = -(moveEvent.clientY - startY);
                    //console.log(x,y)
                    const percentage = Math.min(Math.max(0,  progress + (vertical ? y : x) * 100 / (vertical ? sliderRef.current.offsetHeight: sliderRef.current.offsetWidth)), 90);
                    if(func){
                        func(percentage)
                    }
                }
            };
            const stopDragging = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', stopDragging);
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', stopDragging);
    };
    return (
        <div ref={sliderRef} role="button" className={vertical ?"slider-container-vertical ":"slider-container-horizontal " + (props.barClass ? props.barClass : "")} onClick={toggleSlider}>
            <div ref={sliderHolderRef} className={`slider-holder `} style={ vertical? {bottom: progress+'%'}:{left: progress+'%'}} onMouseDown={startDragging}></div>
            <div className="slider-progress"></div>
        </div>
    )
}

export default Slider;