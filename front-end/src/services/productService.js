import api from "./api";

export const getProducts = async () =>{
    const response = await api.get("/product")

    return response.data;
}

export const addProduct = async (productData) =>{
    const response = await api.post("/product", productData)

    return response.data;
}

export const deleteProduct = async (id) =>{
    const response = await api.delete(`/product/${id}`)

    return response.data;
}

export const editProduct = async (id, productData) =>{
    const response = await api.put(`/product/${id}`, productData)

    return response.data;
}