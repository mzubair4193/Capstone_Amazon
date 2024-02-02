import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllProducts } from "../../redux/product"
import './Home.css'
const HomePage = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => Object.values(state.product))
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
                        <div className="productcont">
                            <div className='producthead' key={product.id}>
                                {product.category}{product.createdAt}
                            </div>
                            <div classNamee='imgHolder'><p className="img">penis</p></div>
                            <div className='prodname'>{product.name}</div>
                            <div className='bottomcont'>{product.return_policy} {product.price}</div>
                        </div>
                    );
                })}

            </div>
        </>
    )
}
export default HomePage