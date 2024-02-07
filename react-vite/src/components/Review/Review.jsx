import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkGetProductDetails } from "../../redux/product";
import { thunkLoadProductReviews } from "../../redux/review";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import DeleteReviewModal from "./DeleteReview";

function ReviewSection() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product)
    const reviews = useSelector((state) => state.reviews.reviews)
    const user = useSelector((state) => state.session.user)

    const { id } = useParams()

    // const cancel = () => {
    //     closeModal();
    // };
    useEffect(() => {
        dispatch(thunkGetProductDetails(id))
        dispatch(thunkLoadProductReviews(id));
    }, [dispatch, id]);

    let hasReviewed = false
    if (reviews) {
        reviews.forEach((review) => {
            if (user.id === review.userId) hasReviewed = true
        })

    }


    if (!product) return null
    if (!reviews) {
        <div className='norevbutton'>
            {user && <OpenModalButton
                buttonText={"Create a Review"}
                className="createreviewbutton"
                modalComponent={<CreateReviewModal />}
            />}
        </div>
    }

    return (
        <div className='reviewBox'>
            {user && hasReviewed === false && <OpenModalButton
                buttonText={"Create a Review"}
                className="createreviewbutton"
                modalComponent={<CreateReviewModal />}
            />}
            <div className="review-container">
                {reviews && reviews.map((review) => (
                    <div>
                        <div className='reviewHeader' key={review.id}>
                            {/* {console.log(review)} */}
                            <label>
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={
                                                index <= review?.star_rating ? "star-on" : "star-off"
                                            }
                                        >
                                            <i className="fa-solid fa-star"></i>
                                        </button>
                                    );
                                })}
                            </label>
                            <p>{review.review_text}</p>
                            <div className='reviewbuttons'>
                                {user && review.userId === user.id && <OpenModalButton
                                    buttonText={"Update Review"}
                                    className='updatereviewbutton'
                                    modalComponent={<UpdateReviewModal reviewId={review.id} />}
                                />
                                }
                                {user && review.userId === user.id && <OpenModalButton
                                    buttonText={"Delete Review"}
                                    className='deletereviewbutton'
                                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                />
                                }
                            </div>
                        </div>
                    </div>
                )).reverse()}
            </div>

        </div>
    )
}

export default ReviewSection;