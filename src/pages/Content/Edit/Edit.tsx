import React, {useEffect} from "react";
import {commands} from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import {useLocation} from "react-router-dom";
import {getArticleById, uploadArticle} from "../../../api/articleService.tsx";
import {uploadPicture} from "../../../api/pictureService.tsx";
import {Code} from "../../../components/MarkDown/Code.tsx";
import MDEditor from "@uiw/react-md-editor";

export default function Edit() {
    const [value, setValue] = React.useState("title:   \n" +
        "tags:   \n" +
        "category:   \n" +
        "\n" +
        "---\n" +
        "\n\n<!--more-->");
    let location = useLocation();
    useEffect(()=>{
        if(!location.pathname.startsWith('/edit/0')){
            let id = location.pathname.split('/edit/')[1]
            if(id){
                getArticleById(id).then(res=>{
                    setValue(res)
                }).catch(() => {
                    //console.error('There has been a problem with your fetch operation:', error);
                });
            }
        }else{
            setValue("title:   \n" +
                "tags:   \n" +
                "category:   \n" +
                "\n" +
                "---\n" +
                "\n\n<!--more-->")
        }
    },[location])
    const handleMDChange = (value?: string) => {
        if (value !== undefined) {
            setValue(value);
        }
    };

    // 自定义图片上传处理函数
    const handleImageUpload = (file: File) => {
        return uploadPicture(file).then(res=>{
            return res
        }).catch(() => {
            //console.error('There has been a problem with your fetch operation:', error);
            return ""
        })
    };
    // 自定义文档上传处理函数
    const handleArticleUpload = async (text: string) => {
        uploadArticle(text, location.pathname.split('/edit/')[1]).then(res=>{
            if(res){
                alert("上传成功")
            }else {
                alert("上传失败")
            }
        }).catch(error => {
            alert(error)
        })
    };

    const addImage = {
        name: 'addImage',
        keyCommand: 'addImage',
        buttonProps: { 'aria-label': 'Insert image' },
        icon: (
            <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path fill="currentColor" d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z" />
            </svg>
        ),
        // @ts-ignore
        execute: (state, api) => {
            const input: HTMLInputElement | null = document.getElementById('upload-file') as HTMLInputElement
            if(input){
                input.onchange = async () => {
                    const file = input.files?.[0];
                    if (file) {
                        const url = await handleImageUpload(file)
                        if(url){
                            let modifyText = `![](${url})\n`
                            if(state.selectedText){
                                modifyText = `![${state.selectedText}](${url})\n`;
                            }
                            api.replaceSelection(modifyText);
                        }
                    }
                }
                input.click()
            }
        }
    };
    const saveArticle =  {
        name: 'saveArticle',
        keyCommand: 'saveArticle',
        buttonProps: { 'aria-label': 'Save Article' },
        icon: (
            <svg  viewBox="0 0 1024 1024"  width="12" height="12">
                <path
                    d="M768 896v-341.333333H256v341.333333H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h554.666666l170.666667 170.666667v554.666666a42.666667 42.666667 0 0 1-42.666667 42.666667h-85.333333z m-85.333333 0H341.333333v-256h341.333334v256z"
                    fill="#000000"></path>
            </svg>
        ),
        execute: () => {
            handleArticleUpload(value)
        }
    }
    // @ts-ignore
    return (
        <div style={{width:'100%',height:'100%'}}>
            <div className="container" style={{ height: '100%' }}>
                <MDEditor
                    style={{ backgroundColor: '#dedede'}}
                    height={'100%'}
                    value={value}
                    onChange={handleMDChange}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                        components: {
                            // @ts-ignore
                            code: Code
                        }
                    }}
                    commands={[commands.group(
                        [
                            commands.bold,
                            commands.italic,
                            commands.strikethrough,],
                        {
                            name: "text",
                            groupName: "text",
                            buttonProps: { "aria-label": "Change text" },
                            icon: (
                                <svg  viewBox="0 0 1024 1024"
                                      width="12" height="12">
                                    <path
                                        d="M913.408 1024l-66.56 0q-29.696 0-51.2-5.12t-36.864-15.872-26.112-27.136-19.968-37.888q-15.36-38.912-28.16-70.656t-22.016-55.296q-11.264-26.624-20.48-49.152l-254.976 0q-7.168 23.552-17.408 51.2-8.192 23.552-21.504 56.832t-30.72 72.192q-20.48 46.08-47.104 63.488t-60.416 17.408l-70.656 0q-45.056 0-60.928-19.968t2.56-68.096q18.432-46.08 43.008-108.544t52.224-132.608 57.344-143.872 57.344-144.384q65.536-164.864 137.216-343.04 7.168-17.408 18.432-31.744 10.24-11.264 27.136-21.504t42.496-10.24q26.624 0 43.52 10.752t28.16 24.064q12.288 15.36 19.456 33.792 72.704 180.224 138.24 345.088 27.648 70.656 57.344 143.872t56.832 142.336 51.2 129.536 41.472 104.448q14.336 34.816 4.096 62.464t-43.008 27.648zM616.448 634.88l-97.28-347.136-1.024 0-108.544 347.136 206.848 0z"
                                    ></path>
                                </svg>
                            ),
                        }
                    ),commands.group(
                        [
                            commands.title1,
                            commands.title2,
                            commands.title3,
                            commands.title4,
                            commands.title5,
                            commands.title6
                        ],
                        {
                            name: "title",
                            groupName: "title",
                            buttonProps: { "aria-label": "Insert title" },
                            icon: (
                                <svg viewBox="0 0 1024 1024" width="12" height="12">
                                    <path
                                        d="M64.1 66v303.7l39.5-1.3c13.6-110.8 102.6-186.4 153.2-199 50.7-12.6 148.3 1.1 148.3 1.1s-1.3 625.2-1.3 669.2c0 44.1-59.3 63-59.3 63l-79 1.3-1.2 55.4h493.1v-54.1h-90.2c-40.8-3.8-65.4-56.7-65.4-56.7l1.1-684.5s61.8-11.3 150.8 5.1c89 16.4 164.3 204.1 164.3 204.1h39.5V66H64.1z"
                                        fill="#383838"></path>
                                </svg>
                            ),
                        }
                    ),
                        commands.hr,
                        commands.divider,
                        commands.group([
                                commands.link,
                                commands.quote,
                                commands.code,
                                commands.codeBlock,
                                commands.comment,
                                commands.image],
                            {
                                name: "rich",
                                groupName: "rich",
                                buttonProps: { "aria-label": "Insert rich text" },
                                icon: (
                                    <svg viewBox="0 0 1024 1024" width="12" height="12">
                                        <path
                                            d="M218.316 307.727h87.886v205.06h-29.297v29.295h117.179v-29.294H364.79V307.727h87.882v29.293h29.294v-87.882H189.022v87.882h29.294v-29.293z m322.242 58.59h292.945v58.588H540.558v-58.588z m0 117.177h292.945v58.588H540.558v-58.588z m-351.536 117.18h644.481v58.588h-644.48v-58.587z m0 117.176h644.481v58.588h-644.48V717.85z m351.536-468.713h292.945v58.589H540.558v-58.589z m420.923 713.13H61.045V63.309h900.436v898.958z m-864.62-35.816h828.804V99.125H96.861V926.45z"
                                        ></path>
                                    </svg>
                                )
                            }),commands.divider,
                        commands.group([
                                commands.table,
                                commands.unorderedListCommand,
                                commands.orderedListCommand,
                                commands.checkedListCommand],
                            {
                                name: "list",
                                groupName: "list",
                                buttonProps: { "aria-label": "Insert list" },
                                icon: (
                                    <svg  viewBox="0 0 1024 1024"  width="12" height="12">
                                        <path
                                            d="M480 64v352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64C0 28.6 28.7 0 64 0h352c35.3 0 64 28.6 64 64zM1024 64v352c0 35.3-28.7 64-64 64H608c-35.3 0-64-28.7-64-64V64c0-35.4 28.7-64 64-64h352c35.3 0 64 28.6 64 64zM480 608v352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V608c0-35.4 28.7-64 64-64h352c35.3 0 64 28.6 64 64zM1024 608v352c0 35.3-28.7 64-64 64H608c-35.3 0-64-28.7-64-64V608c0-35.4 28.7-64 64-64h352c35.3 0 64 28.6 64 64z"
                                        ></path>
                                    </svg>
                                )
                            }),
                        commands.divider,
                        addImage, saveArticle,
                        commands.divider,
                        commands.help
                    ]}
                />

                <input
                    id="upload-file"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
}