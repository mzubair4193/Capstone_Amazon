import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateProduct, thunkGetAllProducts } from "../../redux/product"
import { useModal } from "../../context/Modal"
import { useNavigate } from 'react-router-dom';
import logo from "../../../public/logo-black.png"
import "./CreateProduct.css"

const CreateProduct = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [returnPolicy, setReturnPolicy] = useState("")
    const [category, setCategory] = useState("")
    const [errors, setErrors] = useState([])
    const [image, setImage] = useState("")

    const categories = ['headphones', 'laptops', 'tv', 'pet', 'kids', 'automotive', 'sports', 'beauty', 'entertainment']

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (category === '') {
            setErrors(['Please select a category'])
        }

        if ((productName && price && description && returnPolicy && category) || image) {

            const formData = new FormData()

            if (image) formData.append("image", image)
            console.log(productName, price, description, returnPolicy, category)
            formData.append('name', productName)
            formData.append('price', parseFloat(price))
            formData.append("description", description)
            formData.append("category", category)
            formData.append("return_policy", returnPolicy)
            console.log(formData)
            try {
                await dispatch(thunkCreateProduct(formData))
                await dispatch(thunkGetAllProducts())
                navigate('/')
                closeModal()
            } catch (error) {
                console.error('Error creating product:', error);
                setErrors(['Error creating product. Please try again.'])
            }

        }
    }

    return (
        <div className="createmodal">
            <img src={logo} className="login-business-logo" onClick={() => navigate("/")} />
            <h1 className="header-text" >Create Product</h1>
            <form onSubmit={handleSubmit} className='prodform'>
                <label>
                    <div className="category-txt" >Category</div>
                    <div>
                        <select
                            className='inputdrop'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}>
                            <option value=''>Select A Category</option>

                            {categories.map((category) => (
                                <option key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <div className="update-input-container" >
                        <div className="category-txt" >Product Name</div>
                        <input
                            className="input-area"
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <div className="category-txt" >Product Description</div>

                        <input
                            className="input-area"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="category-txt" >Price</div>

                        <input
                            className="input-area"
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div className="category-txt" >Return Policy</div>

                        <input
                            className="input-area"
                            type="text"
                            placeholder="Return Policy"
                            value={returnPolicy}
                            onChange={(e) => setReturnPolicy(e.target.value)}
                        />

                        <label className='imageBox'>
                            Image (optional):
                            <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} className='fileup' />
                        </label>
                    </div>
                </label>
                <button type='submit' className="submitProd" disabled={productName.length === 0 || description.length === 0 || price === 0 || returnPolicy.length === 0}>Submit</button>
            </form>
        </div>
    )

}

export default CreateProduct
