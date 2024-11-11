import  {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {getCodeString} from "rehype-rewrite";
import mermaid from "mermaid";
const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);
// @ts-ignore
export const Code = ({ inline, children = [], className, ...props }) => {
    const demoid = useRef(`dome${randomid()}`);
    const [container, setContainer] = useState(null);
    const isMermaid =
        className && /^language-mermaid/.test(className.toLocaleLowerCase());
    const code = children
        ? getCodeString(props.node.children)
        : children[0] || "";

    useEffect(() => {
        if (container && isMermaid && demoid.current && code) {
            mermaid
                .render(demoid.current, code)
                .then(({ svg, bindFunctions }) => {
                    // @ts-ignore
                    container.innerHTML = svg;
                    if (bindFunctions) {
                        bindFunctions(container);
                    }
                })
                .catch(() => {
                    //console.log("error:", error);
                });
        }
    }, [container, isMermaid, code, demoid]);

    const refElement = useCallback((node:any) => {
        if (node !== null) {
            setContainer(node);
        }
    }, []);

    if (isMermaid) {
        return (
            <Fragment>
                <code id={demoid.current} style={{ display: "none" }} />
                <code className={className} ref={refElement} data-name="mermaid" />
            </Fragment>
        );
    }
    return <code className={className}>{children}</code>;
};