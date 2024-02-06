import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetProductDetails } from "../../redux/product"
import { useParams } from "react-router-dom"
import { thunkLoadProductReviews } from "../../redux/review"

const ProductPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const product = useSelector((state) => state.product.product)
    const reviews = useSelector((state) => state.reviews.reviews)
    // console.log("PRODUCTID", productId)
    useEffect(() => {
        const fetchData = async () => {
            dispatch(thunkGetProductDetails(id))
            dispatch(thunkLoadProductReviews(id))
        }
        fetchData()
    }, [dispatch, id])
    console.log(reviews)
    if (!product) return null
    return (
        <>
            <div className="productpage">
                <img className="productImg" src='https://placehold.co/600x400'></img>
                <div className='prodname'>{product.name}</div>
                <div className='bottomcont'>{product.price}</div>
            </div>
            {reviews && reviews.map((review) => (
                <div>
                    {review.review_text}
                </div>
            ))}
        </>
    )
}

export default ProductPage
