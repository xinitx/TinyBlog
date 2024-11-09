import axios from "axios";

export interface Song{
    id: number;
    title: string;
    artist: string;
    url: string;
}
export const getSongs = async ():Promise<Song[]>=>{
    try {
        const response = await axios.get('http://localhost:8088/songs');
        return response.data as  Song[];
    } catch (e) {
        console.error(e);
        return [];
    }
}