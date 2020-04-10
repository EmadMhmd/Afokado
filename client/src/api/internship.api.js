import axios from 'axios';



export const apiAddInternship= internship => {
    return axios.post('http://localhost:5000/add_internship',internship)
}


export const apiFetchInternships= () => {
    return axios.get('http://localhost:5000/fetch_internships')
}


export const apiUpdateInternship= internship => {

    return axios.put(`http://localhost:5000/update_internship/${internship._id}`, internship )
}


export const apiDeleteInternship= (id) => {
    return axios.delete(`http://localhost:5000/delete_internship/${id}`)
}

