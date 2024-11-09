
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
        const response = await axios.get('http://localhost:8088/summaries');
        return response.data as Summary[];
    }catch (e){
        console.log(e)
        return []
    }
}
export const getArticleById = async (id:string):Promise<string>=>{
    try {
        const response = await axios.get('http://localhost:8088/article/'+id);
        return response.data as string;
    }catch (e){
        console.log(e)
        return ""
    }
}
export const uploadArticle = async (articleContent:string, id = "0")=>{
    try {
        const response = await axios.post('http://localhost:8088/uploadArticle', {articleContent:articleContent, id:id},{
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data as boolean;
    } catch (error) {
        console.error('Error uploading Article:', error);
        return "error";
    }
}