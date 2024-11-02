import React, { useState, useEffect } from 'react';
import "./TypingEffect.less"
interface TypingEffectProps {
    strings: string[];
    typeSpeed?: number;
    backSpeed?: number;
    showCursor?: boolean;
    cursorChar?: string;
}
const TypingEffect: React.FC<TypingEffectProps> = (props:TypingEffectProps) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const {strings, typeSpeed = 50, backSpeed = 25, showCursor = true, cursorChar = '|'} = props;
    useEffect(() => {
        let timeoutId;

        if (!isDeleting) {
            // 增加字符
            timeoutId = setTimeout(() => {
                setCurrentText(strings[currentIndex].substring(0, currentText.length + 1));
                if (currentText === strings[currentIndex]) {
                    setIsDeleting(true);
                }
            }, typeSpeed);
        } else {
            // 删除字符
            timeoutId = setTimeout(() => {
                setCurrentText(strings[currentIndex].substring(0, currentText.length - 1));
                if (currentText === '') {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
                    setIsDeleting(false);
                }
            }, backSpeed);
        }
        return () => clearTimeout(timeoutId);
    }, [currentText, currentIndex, isDeleting, strings, typeSpeed, backSpeed]);

    return (
        <span>
            <span>{currentText}</span>
            {showCursor && <span className="cursor">{cursorChar}</span>}
        </span>
    );
};

export default TypingEffect;
