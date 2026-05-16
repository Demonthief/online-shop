import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../services/authServices"

export default function RegisterPage() {
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        name : "",
        email : "",
        password : ""
    })

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            await registerUser(formData)
            alert("Registrasi User Berhasil")
            navigate("/")
        }catch(e){
            alert(e.response.data.message)
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-120">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Nama"
                        className="w-full border p-3 rounded-lg"
                        name="name"
                        onChange={handleChange} 
                    />

                    <input 
                        type="email"
                        placeholder="E-mail"
                        className="w-full border p-3 rounded-lg"
                        name="email"
                        onChange={handleChange} 
                    />

                    <input 
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg"
                        name="password"
                        onChange={handleChange} 
                    />

                    <button className="w-full bg-black text-white py-3 rounded-lg">
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    )
}