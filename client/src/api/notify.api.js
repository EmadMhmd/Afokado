import axios from 'axios';
export const apiOpenLawyerNotifications= type =>{
    return axios.put(`http://localhost:5000/open_lawyer_notifications/${type}`)
}
export const apiFetchLawyerNotifications= () =>{
    return axios.get('http://localhost:5000/fetch_lawyer_notifications')
}

export const apiFetchStudentNotifications= () =>{
    return axios.get('http://localhost:5000/fetch_student_notifications')
}

export const apiOpenStudentNotifications= () =>{
    return axios.put(`http://localhost:5000/open_student_notifications`)
}