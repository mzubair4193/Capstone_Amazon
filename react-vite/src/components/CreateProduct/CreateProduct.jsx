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
    // const [category, setCategory] = useState("")
    const [errors, setErrors] = useState([])
    const [image, setImage] = useState("")

    const categories = ['headphones', 'laptops', 'tv', 'pet', 'kids', 'automotive', 'sports', 'beauty', 'entertainment']

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (category === '') {
        //     setErrors(['Please select a category'])
        // }

        if ((productName && price && description && returnPolicy) || image) {

            const formData = new FormData()

            if (image) formData.append("image", image)
            console.log(productName, price, description, returnPolicy)
            formData.append('name', productName)
            formData.append('price', parseFloat(price))
            formData.append("description", description)
            // formData.append("category", category)
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
                    {/* <div className="category-txt" >Category</div>
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
                    </div> */}
                    {/* <br /> */}
                    <div className="update-input-container" >
                        <div className="category-txt" >Product Name</div>
                        <input
                            className="input-area"
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            maxLength={40}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        {productName.length === 40 && <p className="e1">Max: 40</p>}
                        <div className="category-txt" >Product Description</div>

                        <input
                            className="input-area"
                            type="text"
                            placeholder="Description"
                            value={description}
                            maxLength={100}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {description.length === 100 && <p className="e2">Max: 100</p>}
                        <div className="category-txt" >Price</div>

                        <input
                            className="input-area"
                            type="text"
                            placeholder="Price"
                            value={price}
                            maxLength={7}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {price.length === 7 && <p className="e3">Max: 7 Digits</p>}
                        <div className="category-txt" >Return Policy</div>

                        <input
                            className="input-area"
                            type="text"
                            placeholder="Return Policy"
                            value={returnPolicy}
                            maxLength={50}
                            onChange={(e) => setReturnPolicy(e.target.value)}
                        />
                        {returnPolicy.length === 50 && <p className="e4">Max: 50</p>}

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
