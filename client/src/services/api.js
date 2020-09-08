import axios from 'axios';


export const setToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else{
        delete axios.defaults.headers.common['Authorization'];
    }
    
}
export const call = async (method, path, data) => {

    const res = await axios[method](`/${path}`, data);
    return res.data;
}

export default {call, setToken};