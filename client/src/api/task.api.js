import axios from 'axios';

export const apiAddTask=(task)=>{
    return axios.post('http://localhost:5000/add_task',task);
}
export const apiDeleteTask =(id)=>{
    return axios.delete(`http://localhost:5000/delete_task/${id}`)
}
export const apiUpdateTask=(task)=>{
    return axios.put(`http://localhost:5000/update_task/${task._id}`,task)
}
export const apiFetchTasks=()=>{
    return axios.get(`http://localhost:5000/fetch_tasks`)
}