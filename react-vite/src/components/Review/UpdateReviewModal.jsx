import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { thunkLoadProductReviews, thunkUpdateReview } from "../../redux/review";
import logo from "../../../public/logo-black.png"
import "./CreateReview.css"

const UpdateReviewModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const [starRating, setStarRating] = useState(0);
    const [review, setReview] = useState("");
    const { closeModal } = useModal();

    const { id } = useParams();
    const reviews = useSelector((state) => state.reviews.reviews);

    // Find the specific review using reviewId
    const currentReview = reviews.find((rev) => rev.id === reviewId);

    // useEffect to set initial state when the component mounts
    useEffect(() => {
        if (currentReview) {
            setStarRating(currentReview.star_rating);
            setReview(currentReview.review_text);
        }
    }, [currentReview]);

    const onStarChange = (value) => {
        setStarRating(value);
    };

    const renderStars = () => {
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
                                className={index <= starRating ? "star-on" : "star-off"}
                                onClick={() => onStarChange(index)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </button>
                        );
                    })}
                </label>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(thunkUpdateReview(reviewId, review, starRating));
        await dispatch(thunkLoadProductReviews(id));
        closeModal();
    };

    return (
        <div className="updaterevmodal">
            <h1 className="uar">Update a Review</h1>
            <form onSubmit={handleSubmit} className="reviewform">
                {renderStars()}
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your thoughts on this product"
                    className="reviewpost"
                    rows={9}
                    cols={50}
                    maxLength={150}
                    
                />
                {review.length === 150 && <p className="reverr2">Max: 150</p>}
                <button type="submit" disabled={review.length === 0} className="reviewsubmit">
                    Post Review
                </button>
            </form>
        </div>
    );
};

export default UpdateReviewModal;
