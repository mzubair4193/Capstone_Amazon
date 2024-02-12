import { useDispatch } from "react-redux"
import { thunkDeleteReview, thunkLoadProductReviews } from "../../redux/review"
import { useModal } from "../../context/Modal"
import { useParams } from "react-router-dom"
import logo from "../../../public/logo-black.png"
import "./UpdateReview.css"

const DeleteReviewModal = (reviewId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteReview(reviewId.reviewId))
        await dispatch(thunkLoadProductReviews(id))
        closeModal()
    }

    return (
        <div className='deletereviewmodal'>
               <img src={logo} className="login-business-logo" onClick={() => navigate("/")} />
            <h1 className="deletereviewh1">Delete Your Review</h1>
            <h2 className='deletereviewh2'>Are you sure you want to delete this review?</h2>
            <div className="deletemodalbuttons">
                
                <button className="delete-rev"  onClick={handleSubmit}>Delete</button>
                <button className="delete-rev2"
                  onClick={closeModal}  >
                    Cancel</button>
            </div>
        </div>
    )

}

export default DeleteReviewModal
