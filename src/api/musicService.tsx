import axios from "axios";

export interface Song{
    id: number;
    title: string;
    artist: string;
    url: string;
}
export const getSongs = async ():Promise<Song[]>=>{
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND+ '/songs');
        return response.data as  Song[];
    } catch (e) {
        //console.error(e);
        return [];
    }
}