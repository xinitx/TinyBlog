import axios from "axios";
import {Summary} from "./articleService.tsx";

export const search = async (searchText: string) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND + '/search', { searchText });
        return response.data as Summary[];
    } catch (e) {
        //console.log(e)
        return []
    }
}
