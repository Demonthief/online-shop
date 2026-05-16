import api from "./api";

export const registerUser = async (userData) =>{
    const response = await api.post("/auth/register", userData)

    return response.data
}

export const loginUser = async (userData) =>{
    const response = await api.post("/auth/login", userData)

    console.log("AUTH SERVICES DIPAKAI")
    return response.data
}
