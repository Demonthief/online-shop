import Product from "../models/Product.js";

export const getProducts = async (req,res) =>{
    const keyword = req.query.search
        ? {
            name : {
                $regex : req.query.search,
                $options : "1"
            } }
        : {};

        const products = await Product.find(keyword)

        res.json(products)
}

export const addProduct = async (req,res) =>{
    const {name, price, description, image} = req.body

    const product = await Product.create({
        name,
        price,
        description,
        image
    })

    res.status(201).json({message : "Produk berhasil dibuat", product})
}  

export const deleteProduct = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message : "Produk tidak ditemukan"})
        }

        await product.deleteOne();

        res.json({message : "Produk Berhasil dihapus"})
    }catch(e){
        res.status(500).json({message : e.message})
    }
}

export const editProduct = async (req,res) =>{
    try{
        const {name, price, description, image} = req.body;

        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            price,
            description,
            image
        },
        {
            new : true
        }
    )

    if(!product){
        return res.status(404).json({message : "Produk tidak ditemukan"})
    }

    res.json(product)
    }catch(e){
        res.status(500).json({message : e.message})
    }
}
