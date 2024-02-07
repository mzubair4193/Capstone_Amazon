import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkGetProductDetails } from "../../redux/product";
import { thunkLoadProductReviews } from "../../redux/review";

function ReviewSection() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product)
    const reviews = useSelector((state) => state.reviews.reviews)
    const user = useSelector((state) => state.session.user)
    const { closeModal, setModalContent } = useModal();
    const [enableSubmit, setEnableSubmit] = useState(false);
    const { id } = useParams()

    const cancel = () => {
        closeModal();
    };
    useEffect(() => {
        dispatch(thunkGetProductDetails(id))
        dispatch(thunkLoadProductReviews(id));
    }, [dispatch]);

    if (!product || !reviews) return null

    return (
        <div className='reviewBox'>
            {user && <OpenModalButton 
                buttonText={"Create a Review"}
                className="createreviewmodalbutton"
                modalComponent={<CreateReviewModal />}
            />}
            <div className="review-container">
                {reviews && reviews.map((review) => (
                    <div className='reviewHeader'>
                        <p>{review.starRating}</p>
                        <p>{review.reviewText}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ReviewSection;