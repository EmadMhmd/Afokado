import axios from 'axios';

export const apiFetchRates=(id)=>{
    return axios.get(`http://localhost:5000/fetch_rates/${id}`)
}

export const apiAddRate=(rate)=>{
    return axios.post(`http://localhost:5000/add_rate`,rate)
}