import axios from "axios";

import CryptoJS from "crypto-js";
export const uploadPicture = async (file: File): Promise<string> => {
    console.log("上传图片3")
    const chunkSize = 1024 * 1024; // 1Mb
    const totalChunks = Math.ceil(file.size / chunkSize);
    // 使用 Promise 包装 FileReader 操作
    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
    let wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    const fileSHA256 = CryptoJS.SHA256(wordArray).toString();
    console.log(fileSHA256)
    const chunkRequest : Promise<string>[] = []
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);
            const formData = new FormData();
            console.log(chunk)

            formData.append('chunk', chunk);
            formData.append('filename', fileSHA256);
            formData.append('totalChunks', totalChunks.toString());
            formData.append('currentChunk', i.toString());
            console.log("上传图片4")
            try {
                chunkRequest.push(axios.post(import.meta.env.VITE_BACKEND+ '/uploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                }).then((response) => {
                    if (response.status === 200) {
                        console.log('上传成功');
                        console.log(response.data)
                        console.log(response.data.url)
                        return response.data.url as string;
                    } else if (response.status === 201) {
                        console.log('上传分块成功');
                    }
                    return '';
                }));
            } catch (error) {
                console.error('上传失败:', error);
                return '';
            }
        }
        try {
            const urls = await Promise.all(chunkRequest);
            console.log(urls)
            return urls.join('');
        } catch (error) {
            console.error('上传失败:', error);
            return '';
        }
}


