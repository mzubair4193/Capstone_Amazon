import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateProduct, thunkGetAllProducts } from "../../redux/product"
import { useModal } from "../../context/Modal"

const CreateProduct = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [returnPolicy, setReturnPolicy] = useState("")

    const product = {
        name: productName,
        price: parseFloat(price),
        description,
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

export default CreateProduct