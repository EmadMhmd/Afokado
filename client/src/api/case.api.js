import axios from 'axios';

export const apiAddCase= newCase => {
    return axios.post('http://localhost:5000/add_case',newCase)
}


export const apiFetchCases=(query)=>{
    if(query.archive || query.type ){
        return axios.get(`http://localhost:5000/fetch_cases/${ (query.archive) ? query.archive : 'em'}/${ (query.type) ? query.type : 'em'}`);
    }
    return axios.get(`http://localhost:5000/fetch_cases`);
}
export const apiFetchUserCases=()=>{
    return axios.get(`http://localhost:5000/fetch_user_cases`);
}
export const apiGetCase= (id) => {
    return axios.get(`http://localhost:5000/get_case/${id}`)
}

export const apiUpdateCase= one_case => {
    return axios.put(`http://localhost:5000/update_case/${one_case._id}`,one_case )
}

export const apiDeleteCase= (id) => {
    return axios.delete(`http://localhost:5000/delete_case/${id}`)
}

export const apiArchiveCase= (archivedCase) => {
    return axios.put(`http://localhost:5000/archive_case`,archivedCase)
}
export const apiGetNewCaseOwner= ({email='em' , mobile='em'}) => {
    return axios.get(`http://localhost:5000/get_new_owner/${ (email) ? email : 'em'}/${ (mobile) ? mobile : 'em'}`);
}
export const apiCaseOwnerUpdate= (caseId , owner) => {
    return axios.put(`http://localhost:5000/update_case_owner/${caseId}/${owner}`)
}
