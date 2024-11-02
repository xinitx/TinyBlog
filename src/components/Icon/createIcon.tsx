import React, { forwardRef } from 'react';
import {Icon, IconProps} from "./Icon.tsx";


interface CreateIconOptions {
    content: React.ReactNode;
    iconProps?: IconProps;

}

export function createIcon(options: CreateIconOptions) {
    const { content, iconProps = {} } = options;

    return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
        return <Icon ref={ref} {...iconProps} {...props}>
            {content}
        </Icon>

    });
}