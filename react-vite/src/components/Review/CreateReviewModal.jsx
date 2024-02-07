// import { useEffect } from "react"
import { useDispatch
 } from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { thunkPostReview } from "../../redux/review";
import { thunkLoadProductReviews } from "../../redux/review";

const CreateReviewModal = () => {
    const dispatch = useDispatch()
    const [starRating, setStarRating] = useState(0)
    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const intRating = parseFloat(starRating)

        await dispatch(thunkPostReview(id, review, intRating))
        await dispatch(thunkLoadProductReviews(id))
        closeModal()
    }

    return (
        <div className='createrevmodal'>
            <h1 className='car'>Create a Review</h1>
            <form onSubmit={handleSubmit} className="reviewform">
                <input
                    type="text"
                    value={review}
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
                <button type='submit' disabled={1 < starRating > 5 || review.length === 0} className='reviewsubmit'>Post Review</button>
            </form>
        </div>
    )
}

export default CreateReviewModal