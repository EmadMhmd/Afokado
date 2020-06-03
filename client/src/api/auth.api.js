import axios from 'axios';


export const apiSign=( user)=>{
    return axios.post('http://localhost:5000/sign', user)
}



export const apiLogin=( user)=>{
    return axios.post(`http://localhost:5000/auth`, user)
}


export const apiGetProfile=()=>{
    return axios.get('http://localhost:5000/me')
}


export const apiSignForBook= user =>{
    return axios.post(`http://localhost:5000/signforbook`,user)
}

export const apiUpdateUser= user =>{
    return axios.put(`http://localhost:5000/update_user`,user)
}

export const apiUpgradeUser= () =>{
    return axios.put(`http://localhost:5000/upgrade_user`)
}


export const apiForgetPassword= (email) =>{
    return axios.put(`http://localhost:5000/forget_password`,email)
}
export const apiResetPassword= (pass , link) =>{
    return axios.put(`http://localhost:5000/reset_password/${link}`, pass)
}




