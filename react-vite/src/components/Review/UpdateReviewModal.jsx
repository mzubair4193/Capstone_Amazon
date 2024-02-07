import { useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useParams } from "react-router-dom"
import { thunkLoadProductReviews, thunkUpdateReview } from "../../redux/review"

const UpdateReviewModal = (reviewId) => {
    const dispatch = useDispatch()
    const [starRating, setStarRating] = useState(0)
    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const { id } = useParams()

    console.log(reviewId)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(thunkUpdateReview(reviewId.reviewId, review, starRating))
        await dispatch(thunkLoadProductReviews(id))
        closeModal()
    }

    return (
        <div className='updaterevmodal'>
            <h1 className='uar'>Update a Review</h1>
            <form onSubmit={handleSubmit} className="reviewform">
                <input
                    type="number"
                    value={starRating}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                    placeholder="Star Rating 1-5"
                    className="starinput"
                    min={1}
                    max={5}
                />
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your thoughts on this product"
                    className='reviewpost'
                    maxLength={255}
                />
                <button type='submit' disabled={review.length === 0} className='reviewsubmit'>Post Review</button>
            </form>
        </div>
    )

}

export default UpdateReviewModal
