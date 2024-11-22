import "./Slider.less"
import React, {useEffect, useRef, useState} from "react";
interface SliderProps {
    progress: number //绑定的值
    func: (value: number)=>void, //修改值的函数

    barClass?: string,
    holderClass?: string,
    progressClass?: string,
    style?: React.CSSProperties
    vertical?: boolean,
    direction?: 'top' | 'bottom'
}

const Slider: React.FC<SliderProps> = (props)=>{
    const {  vertical= false,  direction= 'top', func, progress, style } = props
    const sliderRef  = useRef<HTMLDivElement>(null);
    const sliderHolderRef  = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const toggleSlider = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation();
        if(sliderRef.current){
            let x:number = 0, y: number = 0
            const rect = sliderRef.current.getBoundingClientRect();
            x = e.clientX - rect.left; // 相对于 div 的 x 坐标
            if(direction === 'top'){
                y = -(e.clientY - rect.bottom);  // 相对于 div 的 y 坐标
            }else{
                y = (e.clientY - rect.top);  // 相对于 div 的 y 坐标
            }
            //console.log(x,y)
            const percentage = Math.min(Math.max(0, (vertical ? y : x) * 100 / (vertical ? sliderRef.current.offsetHeight: sliderRef.current.offsetWidth)), 100);
            if(func){
                func(percentage)
            }

        }
    };
    const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault()
        moveEvent.stopPropagation()
        if(sliderRef.current){
            let x:number = 0, y: number = 0
            x = moveEvent.clientX - startX;
            if(direction === 'top'){
                y = -(moveEvent.clientY - startY);
            }else{
                y = (moveEvent.clientY - startY);
            }
            const percentage = Math.min(Math.max(0,  progress + (vertical ? y : x) * 100 / (vertical ? sliderRef.current.offsetHeight: sliderRef.current.offsetWidth)), 100);
            if(func){
                func(percentage)
            }
        }
    };
    const stopDragging = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopDragging);
        setIsDragging(false);
    };

    const startDragging = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation();
        setStartX(e.clientX);
        setStartY(e.clientY);
        setIsDragging(true);
    };
    useEffect(()=>{
        if(isDragging){
            document.addEventListener('mouseup', stopDragging);
            document.addEventListener('mousemove', handleMouseMove);
        }
        return ()=>{
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('mousemove', handleMouseMove);
        }
    },[isDragging])
    return (
        <div style={style} ref={sliderRef} role="button" className={ (vertical ? "slider-container-vertical ":"slider-container-horizontal ") + (props.barClass ? props.barClass : "")} onClick={toggleSlider}>
            <div ref={sliderHolderRef} className={`slider-holder `} style={ vertical? {bottom: progress * 0.9+'%'}:{left: progress * 0.9+'%'}} onMouseDown={startDragging} onClick={e => e.stopPropagation()}></div>
            <div className="slider-progress"></div>
        </div>
    )
}

export default Slider;