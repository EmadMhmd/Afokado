import axios from 'axios';

export const apiBook= id =>{
    return axios.post(`http://localhost:5000/book/${id}`)
}
export const apiDeleteBook= id =>{
    return axios.delete(`http://localhost:5000/delete_book/${id}`)
}
export const apiUpdateBook= id =>{
    return axios.put(`http://localhost:5000/confirm_book/${id}`)
}
export const apiFetchBooks= () =>{
    return axios.get('http://localhost:5000/fetch_books')
}
export const apiFetchBookRequests= () =>{
    return axios.get('http://localhost:5000/fetch_book_requests')
}
