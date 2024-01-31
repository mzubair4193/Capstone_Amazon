from .db import db, environment, SCHEMA
from datetime import datetime

class Review(db.Model):
    __table_name__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    reviewText = db.Column(db.Text, nullable=False)
    starRating = db.Column(db.Integer, nullable=False)
    itemQual = db.Column(db.Integer)
    shippingQual = db.Column(db.Integer)
    serviceQual = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)