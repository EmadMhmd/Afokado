import axios from 'axios';

export const apiFetchLawyers=(query)=>{
    if(query.spec || query.city || query.userName){
        return axios.get(`http://localhost:5000/fetch_lawyers/${ (query.spec) ? query.spec : 'em'}/${ (query.city) ? query.city : 'em'}/${ (query.userName) ? query.userName : 'em'}`);
    }
    return axios.get(`http://localhost:5000/fetch_lawyers`);
}


export const apiGetLawyer=id=>{
    return axios.get(`http://localhost:5000/get_lawyer/${id}`)
}