import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { loginUser } from "../services/authServices.js"

export default function LoginPage() {

    useEffect(() =>{
        const token = localStorage.getItem("token");
        
        if(token){
            navigate("/dashboard")
        }
    }, [])

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const data = await loginUser(formData)
            
            localStorage.setItem("token", data.token)

            localStorage.setItem("user", JSON.stringify(data.user))
            alert('Berhasil Login')
            navigate("/dashboard")
        
        }catch(e){
            alert('Gagal Login')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-120">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Logo
             </h1>

             <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                 type="email" 
                 placeholder="E-mail"
                 name="email"
                 className="w-full border p-3 rounded-lg"
                 onChange={handleChange}
                 />

                <input
                 type="password" 
                 placeholder="Password"
                 name="password"
                 className="w-full border p-3 rounded-lg"
                 onChange={handleChange}
                 />

                 <button className="w-full bg-black text-white py-3 rounded-lg" type="submit">
                    Login
                 </button>
             </form>
            </div>
        </div>
    )
}
