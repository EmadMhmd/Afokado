import axios from 'axios';
export const apiOpenAppNotifications= () =>{
    return axios.put(`http://localhost:5000/open_app_notifications`)
}
export const apiOpenBookNotifications= () =>{
    return axios.put(`http://localhost:5000/open_book_notifications`)
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