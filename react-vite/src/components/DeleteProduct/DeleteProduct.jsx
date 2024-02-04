import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkDeleteProduct, thunkGetAllProducts } from "../../redux/product"


const DeleteProduct = ({ product }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    console.log("PRODUCTID", product.id)
    const deleteProduct = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteProduct(product.id))
        await dispatch(thunkGetAllProducts())
        closeModal()
    }
    return (
        <>
            <div id='delete_product_container'>
                <h2 className='delprod'>Delete Product?</h2>
                <div className='proddelconfirm'>Are you sure you want to delete this product?</div>
                <div className='productbuttons'>
                    <button onClick={deleteProduct}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteProduct
