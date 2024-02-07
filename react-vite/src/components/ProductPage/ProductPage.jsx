import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetProductDetails } from "../../redux/product"
import { useParams } from "react-router-dom"
import { thunkClearReviewsState, thunkLoadProductReviews } from "../../redux/review"
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import ReviewModal from "../Review/Review"
import ReviewSection from "../Review/Review"

const ProductPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const product = useSelector((state) => state.product.product)
    const reviews = useSelector((state) => state.reviews.reviews)
    // console.log("PRODUCTID", productId)
    useEffect(() => {
        const fetchData = async () => {
            dispatch(thunkClearReviewsState())
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
            <ReviewSection />
        </>
    )
}


export default ProductPage
