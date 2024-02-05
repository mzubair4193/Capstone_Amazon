import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// import { thunkGetAllProductsByCategory } from "../../redux/product"
import { NavLink } from "react-router-dom"
import { thunkGetProductsForCategory } from "../../redux/category"

const CategoryPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const products = useSelector((state) => Object.values(state.product))

    console.log(products)

    useEffect(() => {
        dispatch(thunkGetProductsForCategory(id))
    },[dispatch, id])



    return (
        <>
        <div>
            category:{id}
        </div>
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
                        
                            </NavLink>
                        </div>
                    );
                }).reverse()}
            </div>


        </>


    )
}

export default CategoryPage