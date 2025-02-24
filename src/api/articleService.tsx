
import axios from "axios";
export interface Summary {
    id: string;
    title: string;
    tags: string[];
    category: string[];
    summary: string;
}
export const getSummaries = async ()=>{
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND + '/summaries');
        return (response.data as Summary[]).reverse();
    }catch (e){
        //console.log(e)
        return []
    }
}
export const getArticleById = async (id:string):Promise<string>=>{
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND+ '/article/'+id);
        return response.data as string;
    }catch (e){
        //console.log(e)
        return ""
    }
}
export const uploadArticle = async (articleContent:string, id = "0")=>{
    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND+ '/uploadArticle', {articleContent:articleContent, id:id},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        })
        return response.data as boolean;
    } catch (error) {
        //console.error('Error uploading Article:', error);
        return "error";
    }
}

export const deleteArticle = async (id:string)=>{
    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND+ '/deleteArticle/'+id,{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        })
        return response.data as boolean;
    } catch (error) {
        //console.error('Error uploading Article:', error);
        return false;
    }
}
