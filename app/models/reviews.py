from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    reviewText = db.Column(db.Text, nullable=False)
    starRating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")


    def to_dict(self):
        converted_review = {
            "id": self.id,
            "user": self.user.to_dict(),
            "userId": self.userId,
            "product_id": self.productId,
            "review_text": self.reviewText,
            "star_rating": self.starRating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        return converted_review