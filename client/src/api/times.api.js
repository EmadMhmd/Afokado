import axios from 'axios';



export const apiAddTime= time => {
    return axios.post('http://localhost:5000/add_time',time)
}
export const apiOfficeTimes= times => {
    return axios.put('http://localhost:5000/office_times',times)
}


export const apiFetchTimes= (id) => {

    return axios.get(`http://localhost:5000/fetch_times/${id}`)
}

export const apiDeleteTime= (id) => {
    return axios.delete(`http://localhost:5000/delete_time/${id}`)
}
