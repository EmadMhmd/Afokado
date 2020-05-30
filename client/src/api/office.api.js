import axios from 'axios';



export const apiAddToOffice= id => {
    return axios.post(`http://localhost:5000/add_to_office/${id}`)
}

export const apiGetOffice= () => {
    return axios.get(`http://localhost:5000/get_office`)
}

export const apiGetNewOffice= ({email='em' , mobile='em'}) => {
    return axios.get(`http://localhost:5000/get_new_office/${ (email) ? email : 'em'}/${ (mobile) ? mobile : 'em'}`);
}
export const apiDeleteFromOffice= (id) => {
    return axios.put(`http://localhost:5000/delete_from_office/${id}`)
}


export const apiAcceptOffice= (id) => {
    return axios.put(`http://localhost:5000/accept_office/${id}`)
}
export const apiRejectOffice= (id) => {
    return axios.put(`http://localhost:5000/reject_office/${id}`)
}
export const apiOutFromOffice= (id) => {
    return axios.put(`http://localhost:5000/out_from_office/${id}`)
}

export const apiGetMyOffice= () => {
    return axios.get(`http://localhost:5000/get_my_office`)
}
