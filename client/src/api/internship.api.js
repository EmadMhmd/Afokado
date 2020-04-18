import axios from 'axios';



export const apiAddInternship= internship => {
    return axios.post('http://localhost:5000/add_internship',internship)
}


export const apiFetchInternshipsForLawyer= () => {
    return axios.get(`http://localhost:5000/fetch_internships_for_lawyer`)
}

export const apiFetchInternshipsForApply=(query)=>{
    if(query.spec || query.city || query.userName){
        return axios.get(`http://localhost:5000/fetch_internships_for_apply/${ (query.spec) ? query.spec : 'em'}/${ (query.city) ? query.city : 'em'}/${ (query.paid) ? query.paid : 'em'}`);
    }
    return axios.get('http://localhost:5000/fetch_internships_for_apply')
}

export const apiUpdateInternship= internship => {

    return axios.put(`http://localhost:5000/update_internship/${internship._id}`, internship )
}


export const apiDeleteInternship= (id) => {
    return axios.delete(`http://localhost:5000/delete_internship/${id}`)
}

