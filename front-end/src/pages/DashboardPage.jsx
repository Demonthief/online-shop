import { useEffect, useState } from "react"
import { getProducts,addProduct, deleteProduct, editProduct } from "../services/productService"
import { useNavigate } from "react-router-dom"


export default function DashboardPage() {
    const navigate = useNavigate();
    
    const [products, setProducts] = useState([])
    const [formData, setFormData] = useState({
        name : "",
        price : "",
        description : "",
        image : "",
    })
    const [editingProduct, setEditingProduct] = useState(null)
    const [search, setSearch] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)

    const filteredProducts = products.filter((product) => 
        product.name?.toLowerCase().includes(
            search.toLowerCase()
        )
        // (product.name || "")
        //     .toLowerCase()
        //     .includes(search.toLocaleLowerCase)
    )

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleAddProduct = async () =>{
        try{
            if(editingProduct){
                const updated = await editProduct(editingProduct._id, formData)
                
                setProducts(
                    products.map((product) => product._id === updated._id ? updated : product)
                )
                setEditingProduct(null)

                setFormData({
                    name : "",
                    price : "",
                    description : "",
                    image : ""
                })
            
            }else{        
                const newProduct = await addProduct(formData)

                setProducts([
                    ...products,
                    newProduct
                ])

                setFormData({
                    name : "",
                    price : "",
                    description : "",
                    image : ""
                })

                window.location.reload()
            }
        }catch(e){
            console.log(e.response.data)
        }
    }

    const handleDeleteProduct = async (id) =>{
        
        const confirmDelete = window.confirm("Anda yakin ingin menghapus produk?")
        if(!confirmDelete)return;
        
        try{
            await deleteProduct(id);

            setProducts(products.filter((product) => product._id !== id))
        }catch(e){
            console.log(e.response.data)
        }
    }

    const handleEditProduct = (product) =>{
        setEditingProduct(product)

        setFormData({
            name : product.name,
            price : product.price,
            description : product.description,
            image : product.image
        })
    }

    const handleLogout = () =>{
        const confirmLogout = window.confirm("Anda yakin ingin logout?")
        if(!confirmLogout) return;

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        navigate("/")
    }
    
    useEffect(() =>{
        const fetchProducts = async () =>{
            try{
                const data = await getProducts()

                setProducts(data)
            }catch(e){
                console.log(e.response.data)
            }
        }

        fetchProducts()
    },[])
    
    return (
        <div className="min-h-screen p-10">
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold">
                    Product Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Kelola semua produk toko anda
                </p>
            </div>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col justify-between items-center mb-8">

                    <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">

                        <input 
                            type="text" 
                            placeholder="Cari Produk..."
                            className="w-full border p-4 rounded-xl outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 w-full">
                        <h2 className="text-2xl font-bold mb-5 text-center">
                            Tambah Produk
                        </h2>

                        <div className="grid md:grid-cols-4 gap-4">
                            <input 
                                type="text"
                                placeholder="Nama"
                                name="name"
                                className="border p-4 rounded-xl"
                                value={formData.name} 
                                onChange={handleChange}
                            />

                            <input 
                                type="number"
                                placeholder="Harga"
                                name="price"
                                className="border p-4 rounded-xl"
                                value={formData.price}
                                onChange={handleChange} 
                            />

                            <input 
                                type="text"
                                name= "description"
                                placeholder="Deskripsi Produk"
                                className="border p-4 rounded-xl"
                                value={formData.description}
                                onChange={handleChange} 
                            />

                                <input 
                                type="text"
                                name= "image"
                                placeholder="Image URL"
                                className="border p-4 rounded-xl"
                                value={formData.image}
                                onChange={handleChange} 
                            />

                            <button 
                            className="mt-5 bg-green-500 border hover:border-green-500 hover:cursor-pointer hover:bg-white text-white hover:text-green-500 px-6 py-3 rounded-xl transition-all"
                            onClick={handleAddProduct}
                            >
                                {editingProduct ? "Edit Produk" : "Tambah Produk"}
                            </button>
                        </div>
                    </div>

                    {/* <div className="bg-white rouded-2xl shadow-sm overflow-hidden">

                    </div> */}

                </div>
            </div>
            {/*Modal Product */}
            {
                selectedProduct && (
                    <div 
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    onClick={() => setSelectedProduct(null)}
                    >
                        <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 text-2xl"
                            >
                                X
                            </button>

                            <img 
                            src={selectedProduct.image || "https://via.placeholder.com/300"} 
                            alt={selectedProduct.name}
                            className="w-full h-60 object-cover rounded-xl mb-5" 
                            />

                            <h2 className="text-3xl font-bold mb-3">
                                {selectedProduct.name}
                            </h2>
                            <p className="text-green-600 text-xl font-semibold mb-3">
                                {selectedProduct.price}
                            </p>
                            <p className="text-gray-600">
                                {selectedProduct.description}
                            </p>
                        </div>
                    </div>
                )
            }

            <div className="flex flex-wrap justify-center gap-4">
                {
                    filteredProducts.map((product) =>(
                        <div className="w-80 shadow-sm rounded-xl">
                            <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-60 object-cover mb-4" 
                            />

                            <div className="p-4 flex flex-col justify-center w-full">
                            <h2 className="text-2xl font-bold mb-2">
                                {product.name}
                            </h2>
                            <p className="text-gray-500">
                                {product.price}
                            </p>

                            <div className="flex gap-2">
                                <button 
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rouded-kg"
                                    onClick={() => handleDeleteProduct(product._id)}
                                >
                                        Hapus
                                </button>
                                <button 
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rouded-kg"
                                    onClick={() => handleEditProduct(product)}
                                >
                                        Edit 
                                </button>
                                <button 
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rouded-kg"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                        Detail 
                                </button>
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}