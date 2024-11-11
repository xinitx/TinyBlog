import axios from "axios";

export const login = async (password: string) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND+ '/login', {
            username: "admin",
            password: password
        });
        if(response.data !== "false"){
            sessionStorage.setItem("token", response.data);
            //console.log(response.data)
        }
    } catch (error) {
        //console.error('Error uploading image:', error);
    }
}