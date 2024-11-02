import { PropsWithChildren, forwardRef } from 'react';
import "./Icon.less"

export interface BaseIconProps {
    width?: string,
    height?: string,
    viewBox?: string
    className?: string
}
export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

export const Icon=  forwardRef<SVGSVGElement, PropsWithChildren<IconProps>> ((props, ref) => {
    const {
        width= '1em',
        height= '1em',
        viewBox = '0 0 1024 1024',
        className,
        children,
        ...rest
    } = props;
    return (
        <svg ref={ref} width={width} height={height} viewBox={viewBox} className={className} {...rest}>
            {children}
        </svg>
    )
})