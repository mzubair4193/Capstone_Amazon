const LOAD_PRODUCT_REVIEWS = '/reviews/products/loadProductReviews';
const POST_REVIEW = '/reviews/products/postReview';
const DELETE_REVIEW = '/reviews/deleteReview';
const UPDATE_REVIEW = '/reviews/editReview';
const CLEAR_REVIEWS_STATE = 'reviews/clearReviewsState';

const clearReviewsState = () => ({
    type: CLEAR_REVIEWS_STATE,
});

const loadProductReviews = (productReviews) => ({
    type: LOAD_PRODUCT_REVIEWS,
    productReviews,
});

const postReview = (review) => ({
    type: POST_REVIEW,
    review,
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

export const thunkUpdateReview = (reviewId, reviewText, starRating) => async (dispatch) => {
    try {
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reviewText, starRating }),
        });

        if (res.ok) {
            const updatedReview = await res.json();
            dispatch(updateReview(updatedReview));
            return updatedReview;
        } else {
            console.error('Error updating review');
        }
    } catch (error) {
        console.error('Errors:', error);
    }
};

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            dispatch(deleteReview(reviewId));
        } else {
            console.error('Error deleting review');
        }
    } catch (error) {
        console.error('Errors:', error);
    }
};

export const thunkLoadProductReviews = (productId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/reviews/products/${productId}`);
        if (res.ok) {
            const productReviews = await res.json();
            dispatch(loadProductReviews(productReviews));
            return productReviews;
        } else {
            return null
        }
    } catch (error) {
        console.error('Error loading product reviews:', error);
    }
};

export const thunkClearReviewsState = () => (dispatch) => {
    dispatch(clearReviewsState());
};

export const thunkPostReview = (productId, reviewText, starRating) => async (dispatch) => {
    try {
        const res = await fetch(`/api/reviews/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reviewText, starRating }),
        });

        if (res.ok) {
            const review = await res.json();
            dispatch(postReview(review));
            return review;
        } else {
            console.log('Error posting review:', res.status);
        }
    } catch (error) {
        console.error('Error posting review:', error);
    }
};

const initialState = {
    productReviews: [],
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCT_REVIEWS:
            return {
                ...action.productReviews

            };
        case POST_REVIEW:
            return {
                ...state,
                reviews: [...state.productReviews, action.review],
            };
        case DELETE_REVIEW:
            return {
                ...state,
                reviews: (state.reviews.reviews || []).filter(
                    (review) => review.reviewId !== action.reviewId
                ),
            };
        case UPDATE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.reviews.map((review) =>
                    review.reviewId === action.review.reviewId ? action.review : review
                ),
            };
        case CLEAR_REVIEWS_STATE:
            return initialState;
        default:
            return state;
    }
};

export default reviewsReducer;
