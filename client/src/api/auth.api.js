import axios from 'axios';


export const apiSign=( user)=>{
    return axios.post('http://localhost:5000/sign', user)
}



export const apiLogin=( user)=>{
    return axios.post(`http://localhost:5000/auth`, user)
}


export const apiGetProfile=()=>{
    return axios.get('http://localhost:5000/me')
}


export const apiSignForBook= user =>{
    return axios.post(`http://localhost:5000/signforbook`,user)
}




