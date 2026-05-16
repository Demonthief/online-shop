import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { getProducts,addProduct,deleteProduct, editProduct } from '../controllers/productController.js'


const router = express.Router()

router.get("/", protect, getProducts);
router.post("/", protect, addProduct);
router.put("/:id", protect, editProduct)
router.delete("/:id", protect, deleteProduct)

export default router