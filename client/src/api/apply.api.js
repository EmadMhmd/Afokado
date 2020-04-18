import axios from 'axios';

export const apiApply= id =>{
    return axios.post(`http://localhost:5000/apply/${id}`)
}
export const apiDeleteApplication= id =>{
    return axios.delete(`http://localhost:5000/delete_application/${id}`)
}
export const apiUpdateApplication= id =>{
    return axios.put(`http://localhost:5000/confirm_application/${id}`)
}
export const apiRejectApplication= id =>{
    return axios.put(`http://localhost:5000/reject_application/${id}`)
}
export const apiAcceptApplication= id =>{
    return axios.put(`http://localhost:5000/accept_application/${id}`)
}
export const apiFetchApplications= () =>{
    return axios.get('http://localhost:5000/fetch_applications')
}
export const apiFetchApplicationRequests= () =>{
    return axios.get('http://localhost:5000/fetch_application_requests')
}
