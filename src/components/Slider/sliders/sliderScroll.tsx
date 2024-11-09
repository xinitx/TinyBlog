import React, {useEffect, useState} from "react";
import Slider from "../Slider.tsx";
import "./sliderScroll.less"
interface SliderScrollProps {
    parentRef: React.RefObject<HTMLElement>;
    vertical?: boolean;
}

const SliderScroll : React.FC<SliderScrollProps> = (props) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollable, setScrollable] = useState(false);
    const {parentRef, vertical= false} = props;
    const observeScrollbar = ():void => {
        if (parentRef.current) {
            if(vertical && parentRef.current?.scrollHeight !== parentRef.current?.clientHeight){
                setScrollable(true)
            }else if(!vertical && parentRef.current?.scrollWidth !== parentRef.current?.clientWidth){
                setScrollable(true)
            }else{
                setScrollable(false)
            }
        }
    };
    const handleScroll = () => {
        if (parentRef.current) {
            const maxScroll =  parentRef.current.scrollHeight - parentRef.current.clientHeight;
            const currentScroll = parentRef.current.scrollTop;
            const newScrollProgress = (currentScroll / maxScroll) * 100;
            setScrollProgress(newScrollProgress);
        }
    };
    useEffect(()=>{
        const resizeObserver = new ResizeObserver(observeScrollbar);
        if(parentRef.current){
            resizeObserver.observe(parentRef.current);
            observeScrollbar()
            if(vertical){
                parentRef.current.addEventListener('scroll', handleScroll);
            }
        }
        return()=>{
            if (parentRef.current) {
                parentRef.current.removeEventListener('scroll', handleScroll);
                if(vertical) {
                    resizeObserver.unobserve(parentRef.current);
                }
            }
        }
    },[parentRef])
    useEffect(()=>{
        if(parentRef.current){
            if(vertical){
                parentRef.current.scrollTop = (parentRef.current.scrollHeight - parentRef.current.clientHeight) * scrollProgress / 100
            }else{
                parentRef.current.scrollLeft = (parentRef.current.scrollWidth - parentRef.current.clientWidth) * scrollProgress / 100
            }
        }
    },[scrollProgress])

    return(
        <>
        { vertical ? (scrollable  && <Slider direction={'bottom'} vertical={vertical} barClass={'scroll-vertical'} progress={scrollProgress} func={setScrollProgress} ></Slider>)
        : (scrollable  && <Slider vertical={vertical} barClass={'scroll-horizontal'} progress={scrollProgress} func={setScrollProgress} ></Slider>)
        }
        </>
    )

}
 export default SliderScroll