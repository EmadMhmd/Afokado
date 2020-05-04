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
export const apiFetchTasks=(query)=>{
    if(query.dateline || query.subLawyer ){
        return axios.get(`http://localhost:5000/fetch_tasks/${ (query.dateline) ? query.dateline : 'em'}/${ (query.subLawyer) ? query.subLawyer : 'em'}`);
    }
    return axios.get(`http://localhost:5000/fetch_tasks`);
}
export const apiFetchTasksForCase=(id)=>{
    return axios.get(`http://localhost:5000/fetch_tasks_for_case/${id}`)
}