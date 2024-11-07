import ReactQuill from "react-quill";
import React, {useMemo, useRef, useState} from "react";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";

const Edit: React.FC = (props) =>{
    const [value, setValue] = useState("</p>---\n" +
        "title: vue\n" +
        "date: 2024-07-31 22:25:35\n" +
        "tags: \n" +
        "---<p>");
    const editor = useRef();
    //富文本modules配置
    const modules: any = useMemo(
        // useMemo: 解决自定义失焦问题
        () => ({
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
                    ['blockquote', 'code-block'], // 引用，代码块
                    ['link', 'image' /**'video' */], // 上传链接、图片、上传视频
                    [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                    [{ list: 'ordered' }, { list: 'bullet' }], // 列表
                    [{ script: 'sub' }, { script: 'super' }], // 上下标
                    [{ indent: '-1' }, { indent: '+1' }], // 缩进
                    [{ direction: 'rtl' }], // 文本方向
                    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
                    [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                    [{ font: [] }], // 字体
                    [{ align: [] }], // 对齐方式
                    ['clean'], // 清除字体样式
                ],
                handlers: {
                    image: () => {
                        handleImageInsert();
                    },
                },
            },
        }),
        [],
    );


    const handleImageInsert = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        if(editor.current){
            let quill = editor.current.getEditor();
            const cursorPosition = quill.getSelection().index;
            input.onchange = async () => {
                const file = input.files?.[0];
                if (file) {
                    const url = await handleImageUpload(file);
                    if (url) {
                        quill.insertEmbed(cursorPosition, 'image', url, 'user');
                    }
                }
            };
        }
    };
    // 自定义图片上传处理函数
    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file, 'image.jpg');

        try {
            const response = await axios.post('http://localhost:8088/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 返回图片 URL
            return response.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return '';
        }
    };
    // 自定义文档上传处理函数
    const handleArticleUpload = async () => {
        try {
            const response = await axios.post('http://localhost:8088/api/upload/md', {value:value},{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error uploading Article:', error);
            return '';
        }
    };
    //富文本配置
    const options = {
        modules: modules,
        placeholder: "请输入...",
        value: value,
        theme: 'bubble',
        onChange: setValue,
        onBlur:handleArticleUpload
    };

// 处理 Quill 图片插入

    return(
        <div className={`content`} >
            <div style={{backgroundColor:'#fafafa', color:'#000'}}>
            <ReactQuill ref={editor} {...options} />
            </div>
        </div>
    )
}
export default Edit