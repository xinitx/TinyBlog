import axios from "axios";

export const login = async (password: string) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND+ '/login', {
            username: "admin",
            password: password
        });
        if(response.data !== "false"){
            sessionStorage.setItem("token", response.data);
            return true;
            //console.log(response.data)
        }else{
            return false;
        }
    } catch (error) {
        return  false;
        //console.error('Error uploading image:', error);
    }
}
export const verifyToken = async ()=>{
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND+ '/verifyToken', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        });
        return response.data as boolean;
    } catch (error) {
        //console.error('Error uploading image:', error);
        return false;
    }
}