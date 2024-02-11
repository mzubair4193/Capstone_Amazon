import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateProduct, thunkGetAllProducts } from "../../redux/product"
import { useModal } from "../../context/Modal"
import logo from "../../../public/logo-black.png"
import "./CreateProduct.css"

const CreateProduct = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [returnPolicy, setReturnPolicy] = useState("")
    const [category, setCategory] = useState("")

    const categories = ['headphones', 'laptops', 'tv_video', 'pet_supplies', 'kids_toys', 'automotive_industrial', 'spots_outdoors', 'beauty_health', 'movies_music_games']

    const product = {
        name: productName,
        price: parseFloat(price),
        description,
        category,
        return_policy: returnPolicy
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(product)
        await dispatch(thunkCreateProduct(product))
        await dispatch(thunkGetAllProducts())
        closeModal()
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
            </div>
                </label>
                <button type='submit' className="submitProd" disabled={productName.length === 0 || description.length === 0 || price === 0 || returnPolicy.length === 0}>Submit</button>
            </form>
        </div>
    )

}

export default CreateProduct
