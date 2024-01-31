from .db import db, SCHEMA, environment
from datetime import datetime

class Product(db.Model):
    __tablename__ = "products"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(4,2), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(30), nullable=False)
    subcategory = db.Column(db.String(30), nullable=False)
    free_shipping = db.Column(db.Boolean)
    return_policy = db.Column(db.Text)
    shipping_time = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

