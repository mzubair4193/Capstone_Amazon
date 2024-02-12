import { useEffect } from "react"
import {
    useDispatch
} from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { thunkPostReview } from "../../redux/review";
import { thunkLoadProductReviews } from "../../redux/review";
import './CreateReview.css'
import logo from "../../../public/logo-black.png"

const CreateReviewModal = () => {
    const dispatch = useDispatch()
    const [starRating, setStarRating] = useState(0)
    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(thunkPostReview(id, review, starRating))
        await dispatch(thunkLoadProductReviews(id))
        closeModal()
    }
    const onStarChange = (value, setStarState) => {
        setStarState(value);
    };

    const renderStars = (value, setStarState) => {
        return (
            <div className="ratings">
                <img src={logo} className="login-business-logo" onClick={() => navigate("/")} />
                <label>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= value ? "star-on" : "star-off"}
                                onClick={() => onStarChange(index, setStarState)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </button>
                        );
                    })}
                </label>
            </div>
        );
    };

    return (
        <div className='createrevmodal'>
            <h1 className='car'>Create a Review</h1>
            <form onSubmit={handleSubmit} className="reviewform">
                <div className="star-rating">
                    {renderStars(starRating, setStarRating, "Overall Rating")}
                </div>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={10}
                    cols={30}
                    placeholder="Share your thoughts on this product"
                    className='reviewpost'
                    maxLength={150}
                />
                {review.length === 150 && <p className="reverr">Max: 150</p>}
                <br />
                <button type='submit'
                 disabled={review.length === 0} className='reviewsubmit'>
                Post Review</button>
            </form>
        </div>
    )
}

export default CreateReviewModal