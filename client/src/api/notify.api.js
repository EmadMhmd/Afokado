import axios from 'axios';
export const apiOpenNotifications= id =>{
    return axios.put(`http://localhost:5000/open_notifications`)
}
export const apiFetchNotifications= () =>{
    return axios.get('http://localhost:5000/fetch_notifications')
}