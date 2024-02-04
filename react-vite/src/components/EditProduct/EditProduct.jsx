import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkUpdateProduct, thunkGetAllProducts } from "../../redux/product"
import { useModal } from "../../context/Modal"

const UpdateProduct = ({ product }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [productName, setProductName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [returnPolicy, setReturnPolicy] = useState(product.return_policy)

    const updatedProduct = {
        name: productName,
        price: parseFloat(price),
        description,
        return_policy: returnPolicy
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        // console.log(product)
        await dispatch(thunkUpdateProduct(product.id, updatedProduct))
        await dispatch(thunkGetAllProducts())
        closeModal()
    }

    return (
        <div className="createmodal">
            <h1>Create A Product</h1>
            <form onSubmit={handleSubmit} className='prodform'>
                <label>
                    <input 
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Return Policy"
                        value={returnPolicy}
                        onChange={(e) => setReturnPolicy(e.target.value)}
                    />
                </label>
                <button type='submit' className="submitProd" disabled={productName.length === 0 || description.length ===0 || price === 0 || returnPolicy.length === 0}>Submit</button>
            </form>
        </div>
    )

}   

export default UpdateProduct