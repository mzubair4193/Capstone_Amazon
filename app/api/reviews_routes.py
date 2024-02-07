from flask import Blueprint, request, jsonify
from app.forms.review_form import ReviewForm
from flask_login import current_user, login_required
from app.models import db, Review, Product


review_routes = Blueprint("reviews", __name__)

@review_routes.route('/products/<int:product_id>')
def get_reviews_by_product_id(product_id):
    reviews = Review.query.filter_by(productId=product_id).all()
    if not reviews:
        return {"message": "No reviews for this product"}, 404
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/products/<int:product_id>', methods=['POST'])
@login_required
def create_review(product_id):
    product = Product.query.get(product_id)
    if not product:
        return {"message": "Product not found"}, 404

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_review = Review(
            userId=current_user.id,
            productId=product_id,
            reviewText=data['reviewText'],
            starRating=data['starRating']
        )

        db.session.add(new_review)
        db.session.commit()
        print("AAAAAAAAAAAAAAAAAAAAAAAAA", new_review)
        return new_review.to_dict(), 201
    else:
        return {"error": "Invalid review data"}, 400, print(form.errors)


@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {"message": "Review not found"}, 404

    if current_user.id != review.userId:
        return {"message": "You do not have permission to update this review"}, 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.reviewText = form.data['reviewText']
        review.starRating = form.data['starRating']

        db.session.commit()

        return review.to_dict()
    else:
        return {"error": "Invalid review data"}, 400


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {"message": "Review not found"}, 404

    if current_user.id != review.userId:
        return {"message": "You do not have permission to delete this review"}, 403

    db.session.delete(review)
    db.session.commit()

    return {"message": "Review deleted successfully"}, 200
