import axios from "axios";

export const uploadPicture = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image/*', file, file.name);
    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND+ '/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        });
        // 返回图片 URL
        return response.data.url as string;
    } catch (error) {
        //console.error('Error uploading image:', error);
        return '';
    }
}