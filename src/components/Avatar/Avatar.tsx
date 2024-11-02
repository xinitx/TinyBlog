import './Avatar.less'; // 引入样式文件

import React from 'react';
interface AvatarProps {
    src: string;
    alt: string;
    size: 'small' | 'medium' | 'large';
    className?: string;
}
const Avatar: React.FC<AvatarProps> = ({ src, alt, size, className }) => {
    return (
        <div className={className}>
        <img
            src={src}
            alt={alt}
            className={`avatar avatar--${size} `}
        />
        </div>
    );
};

export default Avatar;