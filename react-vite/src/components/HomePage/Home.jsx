import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllProducts } from "../../redux/product"
import './Home.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteProduct from "../DeleteProduct/DeleteProduct"
import UpdateProduct from "../EditProduct/EditProduct"
import { NavLink } from "react-router-dom"
const HomePage = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => Object.values(state.product))
    const user = useSelector((state) => state.session.user)
    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])

    console.log(products)
    // if (!products) return null
    return (
        <>
            <div className="maincont">
                {products.map((product) => {
                    return (
                        <div className="productcont" key={product.id}>
                            <NavLink to={`/products/${product.id}`} >

                            <div className='producthead'>
                                {product.category}{product.createdAt}
                            </div>
                            <div className='imgHolder'><img className="img" src="https://placehold.co/600x400"></img></div>
                            <div className='prodname'>{product.name}</div>
                            <div className='bottomcont'>{product.price}</div>
                            <div className='productbuttons'>
                            {user && user.id === product.owner_id && (
                                <OpenModalButton buttonText={"Update"} modalComponent={<UpdateProduct product={product} />} />
                                )}    
                            {user && user.id === product.owner_id && (
                                <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteProduct product={product} />} />
                                )}    
                            </div>
                                </NavLink>
                        </div>
                    );
                }).reverse()}

            </div>
        </>
    )
}
export default HomePage