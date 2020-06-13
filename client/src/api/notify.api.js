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

export const apiOpenStudentAppNotifications= () =>{
    return axios.put(`http://localhost:5000/open_student_app_notifications`)
}

//the same end point
export const apiOpenStudentTaskNotifications= () =>{
    return axios.put(`http://localhost:5000/open_student_task_notifications`)
}

export const apiOpenTaskNotifications= () =>{
    return axios.put(`http://localhost:5000/open_student_task_notifications`)
}